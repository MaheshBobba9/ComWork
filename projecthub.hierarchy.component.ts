import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService, UserServiceConfig, User } from 'pg-app-core';
import { Router, ActivatedRoute,Params } from '@angular/router';
import { COMStateService, System } from 'pg-com-core';
import { Hierarchy } from '../shared/models/hierarchy.model';
import { HierarchyDataService } from '../shared/hierarchy.data.service';
import { DataTable } from 'pg-primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Component({
  selector: 'scm-projecthub-hierarchy',
  templateUrl: './projecthub.hierarchy.component.html',
  styleUrls: ['./projecthub.hierarchy.component.css']
})
export class ProjecthubHierarchyComponent implements OnInit {
  hierarchies: Hierarchy[] = [];
  hierGridSearch: String = "";
  projectId: String= "";
  @ViewChild('hierGridTbl')  hierGridTbl: DataTable;
  constructor(
        private _hierDataService: HierarchyDataService,
        private _router: Router,
        private _comStateService: COMStateService,
        private activatedRoute: ActivatedRoute
  ){}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.projectId = params['id'];
       
    });
        this.getHierarchy();
  }

  getHierarchy(){
      this.hierarchies = [];
      this._hierDataService.getReportingGroups(this.projectId).subscribe
      (
        response => {
          response.body.forEach(hier => {
            this.hierarchies.push(new Hierarchy().deserialize(hier));
            setTimeout(() =>{
              this.hierGridTbl.sortSingle();
            }, 100);
            }
          );
        },
        error => { }
      );
  }


}
