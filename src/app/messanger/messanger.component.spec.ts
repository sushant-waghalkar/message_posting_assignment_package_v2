import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SocketService } from './shared/services/socket.service';
import { MessangerComponent } from './messanger.component';
import { FormsModule }    from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Message } from './shared/mod/message';

//import { currentUser } from './_models/index';

describe('MessangerComponent', () => {
  let component: MessangerComponent;
  let fixture: ComponentFixture<MessangerComponent>;
  let socketService: SocketService;
  let currentUser:any;
  let debugElement: DebugElement;
  let messages: Message[] = [];
  let spy: any;
  let mockSocketService = {
    onMessage: () => {true},
    initSocket: ()  => {true}
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ],
      declarations: [ MessangerComponent ],
      providers: [SocketService]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MessangerComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    socketService = debugElement.injector.get(SocketService);

    component.currentUser= {
      id: 1,
      username: "admin",
      password: "admin",
      firstName: "admin",
      lastName: "admin"
    };
    component.username = component.currentUser.username;
    }));
  
    it('Check component tobe defined', () => {
     expect(component).toBeDefined();    
    });
 
    it('Check sendMessage method', () => {
    component.messageContent = "hi admin";
    let btn = fixture.debugElement.query(By.css('input'));
    btn.triggerEventHandler('keyup.enter', null);
    var td = component.today;
    fixture.detectChanges();
    expect(component.today).toEqual(td);
    expect(component.messageContent).toEqual("hi admin");
    });
  
    it('sendMessage method should be called', () => {  
    component.messageContent = null;
    expect(component.messageContent).toEqual(null);
    });
 
    it('onMessage method should be called', () => {
      fixture.detectChanges();
      spyOn(socketService, 'onMessage').and.returnValue({ subscribe: (message) => {
        component.messages.push(message);
        expect(component.messages).toEqual([message]);
      } });
        
    });
 

});
