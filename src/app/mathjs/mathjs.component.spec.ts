import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { KatexModule } from 'ng-katex';

import { LatexService } from '../latex.service';
import { MathjsComponent } from './mathjs.component';

describe('MathjsComponent', () => {
  let component: MathjsComponent;
  let fixture: ComponentFixture<MathjsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MathjsComponent ],
      imports: [
        FormsModule,
        KatexModule
      ],
      providers: [LatexService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MathjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
