import { Component, OnInit, ViewChild } from '@angular/core';
import { Participants } from '../shared/models/Participants.model';
import { ProjectDataService } from '../shared/project.data.service';
import { COMStateService, System } from 'pg-com-core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataTableModule, LazyLoadEvent} from 'pg-primeng/primeng';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataTable } from 'pg-primeng/primeng';
//import {MenuModule} from 'primeng/menu';
import {MenuModule} from 'pg-primeng/primeng';
import {MenuItem} from 'primeng/api';
import { ProjecthubComponent } from "./projecthub.component";

@Component({
  selector: 'scm-projecthub-participant',
  templateUrl: './projecthub.participant.component.html',
  styleUrls: ['./projecthub.participant.component.css']
})
export class ProjecthubParticipantComponent implements OnInit {
  inputQuery;
  projectId: any;
  pageSize: number;
  sortCol: string;
  public participantsData: Participants[] = [];
  participentsList: any[] = []; 
  highLevelMessageSeverity = "info";
  msgs: string[] = [];
  items: MenuItem[];
  isParticipants:boolean;
  isImportParticipants:boolean;
  isErrorParticipants:boolean;
  highLevelMessages: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  public participantstotalRecords;
  @ViewChild("partGridTbl") parGrid: DataTable;
  constructor(    
    private _projDataService: ProjectDataService,
    private _comStateService: COMStateService,
    private _router: Router,
    private _projecthubComponent:ProjecthubComponent
  ) { }

  ngOnInit() {
    
    //this.getParticipants();
    this.isParticipants = true;
    this.isImportParticipants = false;
    this.isErrorParticipants = false;

    this.items = [
      {
        label: 'Import...',
        items: [
          {
            label: 'Participants', command: (event) => {
              this.toggleSelection(true);
            }
          }
          
        ]
      }
    ];

  }

  toggleSelection(active: boolean) {
    if (active === true) {
      this.isParticipants = false;
      this.isErrorParticipants = false;
      this.isImportParticipants = true;
      //this._projecthubComponent.openImportParticipents(2);
    } else if(active === false) {
      this.isParticipants = true;
      this.isErrorParticipants = false;
      this.isImportParticipants = false;
    }
  }

  isParticipantsError(active: boolean){
    if (active === true) {
      this.isParticipants = false;
      this.isErrorParticipants = true;
      this.isImportParticipants = false;
    } else if(active === false) {
      this.isParticipants = false;
      this.isErrorParticipants = false;
      this.isImportParticipants = true;
    }
  }

  loadparticipantsLazy(event: LazyLoadEvent) {
    let pg = event.first;
    if(pg > 0) pg = pg / 10;
    setTimeout(() => {
      this.inputQuery = this._router.url.match(/\w+$/)[0];
      this.sortCol = "LastName";
      //this.participants = [];
      this._projDataService.getParticipantsByProject(this.inputQuery, event.rows, pg, event.sortField, event.sortOrder, this.parGrid.globalFilter.value ).subscribe(
          response => {
              const responseJSON = response.body;
              this.participantsData = <Participants[]>responseJSON["participants"];
              this.participantstotalRecords = responseJSON["totalNumberOfParticipants"];
              //console.log(this.participantsData);
          },
          error => {
              if (error.status === 404 && error.statusText === "Not Found") {
                  this.participantsData = [];
              }else{                
                  this.highLevelMessageSeverity = "error";
                  this.msgs.push("An Error has occured while retrieving systems!");
                  this.highLevelMessages.next(this.msgs);
              }
          }
      );
    });
  }


}
