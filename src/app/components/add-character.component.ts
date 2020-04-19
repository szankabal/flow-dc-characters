import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Address, Alignment, Character } from '../model/character.model';
import { CharactersService } from '../services/characters.service';

@Component({
  selector: 'app-add-character',
  template: `
    <div class="panel panel-default">
      <div class="panel-body">
        <div class="form-group">
          <label class="control-label" for="name">Name</label>
          <input type="text" class="form-control" id="name" #name />
        </div>
        <div class="form-group">
          <label class="control-label" for="planet">Planet</label>
          <input type="text" class="form-control" id="planet" #planet />
        </div>
        <div class="form-group">
          <label class="control-label" for="city">City</label>
          <input type="text" class="form-control" id="city" #city />
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
        <button
          class="btn btn-primary"
          type="submit"
          (click)="onAdd(planet, city)"
        >
          Add New Character
        </button>
        <button
          class="btn btn-primary"
          type="button"
          [routerLink]="['../characters']"
          (click)="onReset()"
        >
          Reset
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
export class AddCharacterComponent {
  public alignments: Alignment[] = [Alignment.GOOD, Alignment.BAD];
  public character: Character = {
    skills: [],
    address: {} as Address
  } as Character;
  public currentSkill: string;

  @ViewChild('name', { static: true }) public name: ElementRef;

  constructor(
    private charactersService: CharactersService,
    private router: Router
  ) {}

  public onAdd(planet: HTMLInputElement, city: HTMLInputElement) {
    this.character.name = this.name.nativeElement.value;
    this.character.address = {
      planet: planet.value,
      city: city.value
    };
    this.charactersService.addCharacter(this.character);
    this.router.navigate(['characters']);
    this.onReset();
  }

  public onAddSkill() {
    this.character.skills.push(this.currentSkill);
    this.currentSkill = null;
  }

  public onReset() {
    this.character = {
      skills: [],
      address: {} as Address
    } as Character;
  }
}
