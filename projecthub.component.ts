import { Component, OnInit } from '@angular/core';
import { TabView } from 'pg-primeng/primeng';
import { Router } from '@angular/router';
import { ProjectDataService } from '../shared/project.data.service';
import { Project } from '../shared/models/project.model';

@Component({
  selector: 'scm-workforce-projecthub',
  templateUrl: './projecthub.component.html',
  styleUrls: ['./projecthub.component.css']
})
export class ProjecthubComponent implements OnInit {

  project: Project = new Project();
  index = 0;
  msgs;

  constructor(
    private _router: Router,
    private _projDataService: ProjectDataService
  ) { }

  ngOnInit() {    
    this._projDataService.project.subscribe(
      proj => {
        this.project = proj;
      },
      err =>{}
    );
  }

  returnToProjects(){
    this._router.navigate(["scm-workforce/projects"]);
  }
    
  onTabChange(event) {
    this.msgs = [];
    this.msgs.push({severity:'info', summary:'Tab Expanded', detail: 'Index: ' + event.index});
    this.index = event.index;
  }

 openImportParticipents(input) {
   if (input === 2) {
    if (this.index === 0 || this.index === 1) {
      this.index = input;
    }
    console.log(this.index);
   }
   else if(input === 0){
    this.index = input;
   }    
  }

}
