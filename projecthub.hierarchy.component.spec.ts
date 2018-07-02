import { ComponentFixture, TestBed, async, inject, fakeAsync, tick} from "@angular/core/testing";
import { HttpResponse } from '@angular/common/http';
import { NO_ERRORS_SCHEMA,Injectable, CUSTOM_ELEMENTS_SCHEMA, ElementRef, Renderer, TestabilityRegistry } from "@angular/core";
import { Router,ActivatedRoute } from "@angular/router";
import { COMStateService } from "pg-com-core";

import { ProjecthubHierarchyComponent } from "./projecthub.hierarchy.component";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Hierarchy } from '../shared/models/hierarchy.model';
import { HierarchyDataService } from '../shared/hierarchy.data.service';
import { Table } from 'primeng/table';

import{activeRouterValue} from'../testing/hierarchy-test-mocks';



describe("ProjecthubHierarchyComponent", () => {
    let comp: ProjecthubHierarchyComponent;
    let fixture: ComponentFixture<ProjecthubHierarchyComponent>;

    beforeEach(() => {
        const routerStub = {};
        const cOMStateServiceStub = {};
        const hierarchyDataServiceStub = {
            getReportingGroups:() => ({
                subscribe: () => (tstHierarchyData())
            })
            // getReportingGroups(projectId:string): Observable<HttpResponse<any>> {
            //     let body =tstHierarchyData();
            //     let httpResponse = Observable.of(new HttpResponse<any>({body:body,status:200}));
        
            //     return httpResponse;
            // },
        };
        TestBed.configureTestingModule({
            declarations: [ ProjecthubHierarchyComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: Router, useValue: routerStub },
                { provide: COMStateService, useValue: cOMStateServiceStub },
                { provide: HierarchyDataService, useValue: hierarchyDataServiceStub },
                {provide: ActivatedRoute, useValue: activeRouterValue}
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(ProjecthubHierarchyComponent);
        fixture.detectChanges();
        comp = fixture.componentInstance;
    });
    it("can load instance",  () => {
        expect(comp).toBeTruthy();
    });
   

    describe("getHierarchy", () => {

        it("makes expected calls", () => {
            const hierarchyDataServiceStub: HierarchyDataService = fixture.debugElement.injector.get(HierarchyDataService);
            spyOn(comp, "getHierarchy");
            comp.ngOnInit();
            // fixture.whenRenderingDone().then(()=>{
            //   comp.getHierarchy(); 
            // });
            
            expect(comp.getHierarchy).toHaveBeenCalled();
        });       

    });

});



//This should be exported from a test repo file

function tstHierarchyData(): any{
    return [
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":120}",
          "sourceId": "1",
          "firstName": "Karla",
          "middleName": "",
          "lastName": "Bell",
          "email": "Karla.Bell@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":121}",
          "sourceId": "2",
          "firstName": "Jeffrey",
          "middleName": "",
          "lastName": "Benjamin",
          "email": "Jeffrey.Benjamin@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":122}",
          "sourceId": "3",
          "firstName": "Donna",
          "middleName": "",
          "lastName": "Black",
          "email": "Donna.Black@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":123}",
          "sourceId": "4",
          "firstName": "Holly",
          "middleName": "",
          "lastName": "Bossert",
          "email": "Holly.Bossert@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":124}",
          "sourceId": "5",
          "firstName": "Candy",
          "middleName": "",
          "lastName": "Bowker",
          "email": "Candy.Bowker@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":125}",
          "sourceId": "6",
          "firstName": "Ronald",
          "middleName": "",
          "lastName": "Bowker",
          "email": "Ronald.Bowker@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":126}",
          "sourceId": "7",
          "firstName": "Adam",
          "middleName": "",
          "lastName": "Burg",
          "email": "Adam.Burg@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":127}",
          "sourceId": "8",
          "firstName": "Trevor",
          "middleName": "",
          "lastName": "Byrd",
          "email": "Trevor.Byrd@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":128}",
          "sourceId": "9",
          "firstName": "Rob",
          "middleName": "",
          "lastName": "Capozziello",
          "email": "Rob.Capozziello@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        },
        {
          "nodeId": "{\"type\":\"node\",\"schema\":\"dbo\",\"table\":\"Person\",\"id\":129}",
          "sourceId": "10",
          "firstName": "Alice",
          "middleName": "",
          "lastName": "Carpenter",
          "email": "Alice.Carpenter@example.fake",
          "lastUpdatedDate": "2018-04-27T00:00:00"
        }
      ];
     

}
