import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { UserService, UserServiceConfig, User } from 'pg-app-core';
import { Router, ActivatedRoute } from '@angular/router';
import { COMStateService, System } from 'pg-com-core';
import { Project } from '../shared/models/project.model';
import { ProjectDataService } from '../shared/project.data.service';
import { DataTable } from 'pg-primeng/primeng';
import { Subscription } from 'rxjs/Subscription';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
  selector: 'scm-workforce-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  prjGridSearch: String = "";

  @ViewChild('prjGridTbl')  prjGridTbl: DataTable;

  cols: any[];
  constructor(
    private _projDataService: ProjectDataService,
    private _router: Router,
    private _comStateService: COMStateService
  ) { }

  ngOnInit() {
    this.getProjects();   
  }

  ngOnDestroy(){}

  getProjects(){
    this.projects = [];
    this._projDataService.getProjectsBysystem(this._comStateService.getActiveSystem().id).subscribe(
      response => {
        response.body.forEach(prj => {
          this.projects.push(new Project().deserialize(prj));
          setTimeout(() =>{
            this.prjGridTbl.sortSingle();
          }, 100);
        }
        );
      },
      error => { }
    );
  }
  addProject(event){

  }

    manageProject(project: Project) {
        //const ref: Referrer = this._utility.getReferrer();
        //this._utility.setReferrer(ref.route, ref.params);
        this._projDataService.setActiveProject(project);
        this._router.navigate(["scm-workforce/projecthub/" + project.projectId]);
    }
}
