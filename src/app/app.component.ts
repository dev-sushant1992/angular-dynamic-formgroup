import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, FormControl } from '@angular/forms';

type ConditionFn = () => boolean;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dynamic-formgroup';
  mainFormGroup: FormGroup;
  optionsFormArray: FormArray;

  get fileTypeValue() {
    return this.mainFormGroup.controls.fileType.value;
  }

  constructor(public formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.optionsFormArray = this.formBuilder.array([
      this.formBuilder.control('', Validators.required)
    ]);

    this.mainFormGroup = this.formBuilder.group({
      fileType: [ 'text', Validators.required ],
      topic: ['Engineering', Validators.required],
      options: this.optionsFormArray,
      textToRead: ['', Validators.required]
    });

    this.mainFormGroup.controls.fileType.valueChanges.subscribe((e) => {
      console.log('valueChanged', e, this.mainFormGroup);
      
      if (e === 'audio') {
        this.mainFormGroup.addControl('audioFile', new FormControl(null, {
          validators: Validators.required,
        }));

        this.mainFormGroup.removeControl('textToRead');
      }

      if (e === 'text') {
        this.mainFormGroup.addControl('textToRead', new FormControl('', {
          validators: Validators.required,
        }));

        this.mainFormGroup.removeControl('audioFile');
      }
    });

    // const conditionText: ConditionFn = () => {
    //   console.log('Outer Condition Video');
    //   return this.mainFormGroup.value.fileType === 'text';
    // };
    // const conditionAudio: ConditionFn = () => {
    //   console.log('Outer Condition Audio');
    //   return this.mainFormGroup.value.fileType === 'audio';
    // };
    // this.mainFormGroup.addControl('textToRead', new FormControl('', {
    //   validators: this.conditionallyRequired(conditionText),
    // }));
    // this.mainFormGroup.addControl('audioFile', new FormControl(null, {
    //   validators: this.conditionallyRequired(conditionAudio),
    // }));

    // this.mainFormGroup.controls.fileType.valueChanges.subscribe((e) => {
    //   console.log(e);
    //   this.mainFormGroup.controls.textToRead.markAsTouched();
    //   this.mainFormGroup.controls.audioFile.markAsTouched();
    // });
  }

  // conditionallyRequired(condition: ConditionFn) {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     console.log('Validating', control);
  //     const result = condition();
  //     if (result) {
  //       console.log('Testing required');
  //       const res = Validators.required(control);
  //       return res;
  //     }
  //     return null;
  //   };
  // }

  addControlToOptionsFormArray() {
      const newFormControl = this.formBuilder.control('', Validators.required);
      this.optionsFormArray.push(newFormControl);
  }

  removeControlAtFromOptionsFormArray(index: number) {
    if (this.optionsFormArray.length > 1) {
      this.optionsFormArray.removeAt(index);
    } else {
      console.log('Cannot remove last control');
    }
  }

  submitForm(e: Event) {
    // console.log('Event: ', e);

    console.log(this.mainFormGroup);
    console.log(this.mainFormGroup.valid);

    // console.log('Text to Read: ', this.mainFormGroup.controls.textToRead.valid);
    // console.log('Audio File: ', this.mainFormGroup.controls.audioFile.valid);
  }
}
