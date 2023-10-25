import {Component, EventEmitter, forwardRef, Input, OnInit, Output, ViewChild} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR, ValidationErrors,
  Validator, Validators
} from "@angular/forms";
import {CoreComponent} from "../core/core.component";
import {MatFormFieldAppearance} from "@angular/material/form-field";
import {map, Observable, of, startWith, takeUntil} from "rxjs";
import { Item } from 'src/app/models/item/item';
import {MatAutocompleteTrigger} from "@angular/material/autocomplete";

/** This allows support [(ngModel)] and ngControl. */
const AUTO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MatAutocompleteFilterComponent),
    multi: true
  };

/** This allows control required validation. */
const AUTO_VALUE_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => MatAutocompleteFilterComponent),
  multi: true,
};

@Component({
  selector: 'app-mat-autocomplete-filter',
  templateUrl: './mat-autocomplete-filter.component.html',
  styleUrls: ['./mat-autocomplete-filter.component.scss'],
  providers: [AUTO_VALUE_ACCESSOR, AUTO_VALUE_VALIDATOR],
})

export class MatAutocompleteFilterComponent extends CoreComponent implements OnInit, ControlValueAccessor, Validator {
  @Input() public label: string = 'Label';
  // @Input() public hasGroup: boolean = false;
  @Input() public placeholderFilter: string = 'Filter...';
  @Input() public returnProperty!: string;
  @Input() public disabled: boolean = false;
  @Input() public displayProperty!: string;
  @Input() public appearance: MatFormFieldAppearance = 'outline';
  @Input() public optionsValues: any[] = [];
  public myControlFilterAutoComplete = new FormControl('');
  public filteredOptions: Observable<Item[]> = of([]);

  public showClear: boolean = false;
  @Input() public value?: string | undefined | null = null;
  @Output() public valueChange = new EventEmitter<string>();
  private onTouchedFn!: Function;
  private onChangedFn!: Function;

  @Input() public clearValue = new EventEmitter();
  // @Output() public valueChange = new EventEmitter();

  @ViewChild(MatAutocompleteTrigger) autocompleteTrigger!: MatAutocompleteTrigger;

  constructor() {
    super();
  }

  ngOnInit(): void {
    this.myControlFilterAutoComplete.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe(value => {
      this.showClear = !!value
      if (this.onTouchedFn) {
        this.onTouchedFn();
        let returnValue = value;
        if (value && this.returnProperty) {
          if (value.hasOwnProperty(this.returnProperty)) {
            // @ts-ignore
            returnValue = value[this.returnProperty];
          } else {
            returnValue = "undefined";
          }
        }
        this.onChangedFn(returnValue);
      }
    })

    if (this.clearValue) {
      this.clearValue.pipe(takeUntil(this.onDestroy)).subscribe(value => {
        //console.log('clearValue', value);
        this.myControlFilterAutoComplete.setValue("undefined");
        this.valueChange.emit("undefined");
      })
    }

    this.filteredOptions = this.myControlFilterAutoComplete.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : '';
        return name ? this._filterDocs(name as string) : this.optionsValues.slice();
      }),
    );
    this.setDisabledState(this.disabled);
  }

  private _filterDocs(value: string): Item[] {
    const filterValue = value.toLowerCase();
    return this.optionsValues.filter(obj => {
      if (typeof obj === 'string') {
        return obj.toLowerCase().includes(filterValue)
      }
      if (obj.hasOwnProperty(this.displayProperty)) {
        return obj[this.displayProperty].toLowerCase().includes(filterValue)
      }
      return obj.toString().toLowerCase().includes(filterValue)
    });
  }

  displayFn = (item: any) => {
    return item && this.displayProperty && item.hasOwnProperty(this.displayProperty) ? item[this.displayProperty] : item;
  }

  registerOnChange(fn: any): void {
    this.onChangedFn = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
    if (isDisabled) {
      this.myControlFilterAutoComplete.disable();
    } else {
      this.myControlFilterAutoComplete.enable();
    }
  }

  writeValue(obj: any): void {
    // console.log('writeValue', obj);
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.errors && control.errors['required']) {
      this.myControlFilterAutoComplete.addValidators(Validators.required);
    }
    return null;
  }

  // @ts-ignore
  onSelectionChange(event) {
    const val = event.option?.value;
    this.valueChange.emit(this.returnProperty ? val[this.returnProperty] : val);
  }

  clearInput() {
    // @ts-ignore
    this.myControlFilterAutoComplete.setValue(undefined);
    this.valueChange.emit(undefined);
    setTimeout(() => {
      this.autocompleteTrigger.closePanel();
    }, 1)
  }
}
