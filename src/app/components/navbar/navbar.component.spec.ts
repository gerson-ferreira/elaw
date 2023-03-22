import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';
import { ROUTES } from '../sidebar/sidebar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['']);
    await TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
      providers: [
        { provide: Location, useValue: { prepareExternalUrl: () => {}, path: () => {} } },
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize listTitles', () => {
    expect(component.listTitles).toEqual(ROUTES.filter(listTitle => listTitle));
  });

  it('should return the correct title', () => {
    spyOn(location, 'prepareExternalUrl').and.callFake((path: string) => path);
    spyOn(location, 'path').and.returnValue('/dashboard');
    let expectedTitle = 'Produtos';
    let actualTitle = component.getTitle();
    expect(actualTitle).toEqual(expectedTitle);
  });

  it('should return default title if no match found', () => {
    spyOn(location, 'prepareExternalUrl').and.callFake((path: string) => path);
    spyOn(location, 'path').and.returnValue('/not-found');
    let expectedTitle = 'Dashboard';
    let actualTitle = component.getTitle();
    expect(actualTitle).toEqual(expectedTitle);
  });
});