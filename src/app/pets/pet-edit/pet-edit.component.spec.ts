/*
 *
 *  * Copyright 2016-2017 the original author or authors.
 *  *
 *  * Licensed under the Apache License, Version 2.0 (the "License");
 *  * you may not use this file except in compliance with the License.
 *  * You may obtain a copy of the License at
 *  *
 *  *      http://www.apache.org/licenses/LICENSE-2.0
 *  *
 *  * Unless required by applicable law or agreed to in writing, software
 *  * distributed under the License is distributed on an "AS IS" BASIS,
 *  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  * See the License for the specific language governing permissions and
 *  * limitations under the License.
 *
 */

/* tslint:disable:no-unused-variable */

/**
 * @author Vitaliy Fedoriv
 */

import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import {PetEditComponent} from './pet-edit.component';
import {FormsModule} from '@angular/forms';
import {PetService} from '../pet.service';
import {OwnerService} from '../../owners/owner.service';
import {PetTypeService} from '../../pettypes/pettype.service';
import {Router, ActivatedRoute} from '@angular/router';
import {RouterStub, ActivatedRouteStub} from '../../testing/router-stubs';
import {Pet} from '../pet';
import Spy = jasmine.Spy;
import {Observable, of} from 'rxjs';
import {MatDatepickerModule} from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {PetType} from "../../pettypes/pettype";

class OwnerServiceStub {

}

class PetServiceStub {
  updatePet(pet_id: string, pet: Pet): Observable<Pet> {
    return of();
  }
  getPetById(pet_id: string): Observable<Pet> {
    return of();
  }
}

class PetTypeServiceStub {
  getPetTypes(): Observable<PetType[]> {
    return of();
  }
}

describe('PetEditComponent', () => {
  let component: PetEditComponent;
  let fixture: ComponentFixture<PetEditComponent>;
  let petService: PetService;
  let testPet: Pet;
  let spy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PetEditComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [FormsModule, MatDatepickerModule, MatMomentDateModule],
      providers: [
        {provide: PetService, useClass: PetServiceStub},
        {provide: OwnerService, useClass: OwnerServiceStub},
        {provide: PetTypeService, useClass: PetTypeServiceStub},
        {provide: Router, useClass: RouterStub},
        {provide: ActivatedRoute, useClass: ActivatedRouteStub}
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetEditComponent);
    component = fixture.componentInstance;
    testPet = {
      id: 1,
      name: 'Leo',
      birthDate: '2010-09-07',
      type: {id: 1, name: 'cat'},
      owner: {
        id: 1,
        firstName: 'George',
        lastName: 'Franklin',
        address: '110 W. Liberty St.',
        city: 'Madison',
        telephone: '6085551023',
        pets: null
      },
      visits: null
    };
    petService = fixture.debugElement.injector.get(PetService);
    spy = spyOn(petService, 'updatePet')
      .and.returnValue(Observable.of(testPet));

    fixture.detectChanges();
  });

  it('should create PetEditComponent', () => {
    expect(component).toBeTruthy();
  });
});
