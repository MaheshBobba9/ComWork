import { Component, OnInit, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TabViewModule } from 'primeng/TabView';
import { Router } from '@angular/router';
import { ProjecthubComponent } from './projecthub.component';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Project } from '../shared/models/project.model';
import { ProjectDataService } from '../shared/project.data.service';

@Injectable()
export class MockRouter {
    navigate() {
      // return jasmine.createSpy('navigate');
    }
}

export class MockProjectDataService {
  private _project: BehaviorSubject<Project> = new BehaviorSubject(null);
  public project: Observable<Project> = this._project.asObservable();
}

describe('ProjecthubComponent', () => {
  let component: ProjecthubComponent;
  let fixture: ComponentFixture<ProjecthubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: new MockRouter() },
        { provide: ProjectDataService, useClass: MockProjectDataService },
      ],
      declarations: [ ProjecthubComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjecthubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
