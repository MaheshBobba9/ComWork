import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NO_ERRORS_SCHEMA } from "@angular/core";
import { ProjectDataService } from "../shared/project.data.service";
import { COMStateService } from "pg-com-core";
import { Router } from "@angular/router";
import { LazyLoadEvent } from "primeng/primeng";
import { ProjecthubComponent } from "./projecthub.component";
import { ProjecthubParticipantComponent } from "./projecthub.participant.component";

describe("ProjecthubParticipantComponent", () => {
    let comp: ProjecthubParticipantComponent;
    let fixture: ComponentFixture<ProjecthubParticipantComponent>;

    beforeEach(() => {
        const projectDataServiceStub = {
            getParticipantsByProject: () => ({
                subscribe: () => ({})
            })
        };
        const cOMStateServiceStub = {};
        const routerStub = {
            url: {
                match: () => ({})
            }
        };
        const lazyLoadEventStub = {
            first: {},
            rows: {},
            sortField: {},
            sortOrder: {}
        };
        const projecthubComponentStub = {
            openImportParticipents: () => ({})
        };
        TestBed.configureTestingModule({
            declarations: [ ProjecthubParticipantComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: ProjectDataService, useValue: projectDataServiceStub },
                { provide: COMStateService, useValue: cOMStateServiceStub },
                { provide: Router, useValue: routerStub },
                //{ provide: LazyLoadEvent, useValue: lazyLoadEventStub },
                { provide: ProjecthubComponent, useValue: projecthubComponentStub }
            ]
        });
        fixture = TestBed.createComponent(ProjecthubParticipantComponent);
        comp = fixture.componentInstance;
    });

    it("can load instance", () => {
        expect(comp).toBeTruthy();
    });

    it("participantsData defaults to: []", () => {
        expect(comp.participantsData).toEqual([]);
    });

    it("participentsList defaults to: []", () => {
        expect(comp.participentsList).toEqual([]);
    });

    it("highLevelMessageSeverity defaults to: info", () => {
        expect(comp.highLevelMessageSeverity).toEqual("info");
    });

    it("msgs defaults to: []", () => {
        expect(comp.msgs).toEqual([]);
    });

    xdescribe("loadparticipantsLazy", () => {
        it("makes expected calls", () => {
            const projectDataServiceStub: ProjectDataService = fixture.debugElement.injector.get(ProjectDataService);
            spyOn(projectDataServiceStub, "getParticipantsByProject");
            //comp.loadparticipantsLazy(lazyLoadEventStub);
            expect(projectDataServiceStub.getParticipantsByProject).toHaveBeenCalled();
        });
    });

    xdescribe("ngOnInit", () => {
        it("makes expected calls", () => {
            spyOn(comp, "toggleSelection");
            comp.ngOnInit();
            expect(comp.toggleSelection).toHaveBeenCalled();
        });
    });

});
