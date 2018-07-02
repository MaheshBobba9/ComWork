import { Component, OnInit, OnDestroy, Injectable, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService, UserServiceConfig, User } from 'pg-app-core';
import { COMStateService, System } from 'pg-com-core';
import { Project } from '../shared/models/project.model';
import { ProjectDataService } from '../shared/project.data.service';
import { DataTable } from 'pg-primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { WorkforceModule } from '../workforce.module';
import { ProjectComponent } from './project.component';
import { Router, ActivatedRoute } from '@angular/router';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';
import { defer } from 'rxjs/observable/defer';


@Injectable()
export class MockProjectDataService {
  getProjectsBysystem(systemId: string): Observable<any> { 
    let data = {body: [{
      "id": 60,
      "name": "WF_April2018",
      "lastUpdate": "10/13/2016",
      "adminStartDt": "10/01/2016",
      "statusId": 1
      }]
    };
    return Observable.of(data);
    
  }
}

export class MockCOMStateService {
  // private _activeSystem: BehaviorSubject<System> = new BehaviorSubject(new System());
  // public activeSystem: Observable<System> = this._activeSystem.asObservable();
  getActiveSystem(): any {
    return {id: 1};
  } 

  setActiveSystem(): void {} 
}

@Injectable()
export class MockRouter {
    navigate() {
      // return jasmine.createSpy('navigate');
    }
}

describe('ProjectComponent', () => {
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;
  let mockProjectDataService: MockProjectDataService;
  let mockCOMStateService: MockCOMStateService;
  let mockRouter: MockRouter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProjectDataService, useClass: MockProjectDataService },
        { provide: Router, useValue: new MockRouter() },
        { provide: COMStateService, useValue: new MockCOMStateService() },
      ],
      declarations: [ ProjectComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    mockProjectDataService = TestBed.get(ProjectDataService);
    mockCOMStateService =  TestBed.get(COMStateService);
    mockRouter = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

});
