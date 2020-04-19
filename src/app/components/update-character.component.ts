import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OnCanDeactivate } from '../guards/can-deactivate.guard';
import { Alignment, Character } from '../model/character.model';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-update-character',
  template: `
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="form-group">
          <label class="control-label" for="name">Name</label>
          <input
            type="text"
            class="form-control"
            id="name"
            [(ngModel)]="character.name"
            disabled
          />
        </div>
        <div class="form-group">
          <label class="control-label" for="planet">Planet</label>
          <input
            type="text"
            class="form-control"
            id="planet"
            [(ngModel)]="character.address.planet"
          />
        </div>
        <div class="form-group">
          <label class="control-label" for="city">City</label>
          <input
            type="text"
            class="form-control"
            id="city"
            [(ngModel)]="character.address.city"
          />
        </div>
        <div class="form-group">
          <label class="control-label" for="affiliation">Affiliation</label>
          <input
            type="text"
            class="form-control"
            id="affiliation"
            [(ngModel)]="character.affiliation"
          />
        </div>
        <div class="form-group">
          <label class="control-label">Alignment</label>
          <div class="radio" *ngFor="let alignment of alignments">
            <input
              type="radio"
              [value]="alignment"
              [(ngModel)]="character.alignment"
            />
            {{ alignment }}
          </div>
        </div>
        <div class="form-group">
          <label class="control-label">Skills</label>
          <div class="form-group" *ngFor="let skill of character.skills">
            <input type="text" class="form-control" disabled [value]="skill" />
          </div>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              [(ngModel)]="currentSkill"
            />
          </div>
          <br />
          <button type="button" class="btn btn-default" (click)="onAddSkill()">
            New Skill
          </button>
        </div>
        <button class="btn btn-primary" type="submit" (click)="onUpdate()">
          Update
        </button>
        <button
          class="btn btn-primary"
          type="button"
          [routerLink]="['/characters']"
        >
          Cancel
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .panel {
        width: 50%;
        margin-left: auto;
        margin-right: auto;
      }
      .radio {
        margin-left: 2rem;
      }
    `
  ]
})
export class UpdateCharacterComponent implements OnInit, OnCanDeactivate {
  public alignments: Alignment[] = [Alignment.GOOD, Alignment.BAD];
  public character: Character;
  public currentSkill: string;
  public allowNavigate: boolean;

  constructor(
    private charactersService: CharactersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.allowNavigate = false;
    this.route.data.subscribe(data => {
      this.character = data.character;
    });
  }

  public onAddSkill() {
    this.character.skills.push(this.currentSkill);
    this.currentSkill = null;
  }

  public onUpdate() {
    this.allowNavigate = true;
    this.charactersService.updateCharacter(this.character.id, this.character);
    this.router.navigate(['characters']);
  }

  public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.allowNavigate) {
      return true;
    } else {
      return confirm('You wish to navigate without saving?');
    }
  }
}
