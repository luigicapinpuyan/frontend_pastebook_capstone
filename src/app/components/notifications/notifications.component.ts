import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Like } from 'src/app/models/like';
import { Notification } from 'src/app/models/notification';
import { NotificationService } from 'src/app/services/notification.service';
import { SessionService } from 'src/app/services/session.service';
import { Comment } from '../../models/comment';
import { Friend } from '../../models/friend';
import { Post } from 'src/app/models/post';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  notificationType: string = "";

  likeContexts: Like[] = [];
  commentContexts: Comment[] = [];
  friendRequestContexts: Friend[] = [];

  likerFullName: string = "";
  // likerFullName: string = this.likeContext.liker?.firstName + " " + this.likeContext.liker?.lastName;
  // commenterFullName: string = this.commentContext.commenter?.firstName + " " + this.commentContext.commenter?.lastName;
  // requesterFullName: string = this.friendRequestContext.sender?.firstName + " " + this.friendRequestContext.sender?.lastName;
  // receiverFullName: string = this.friendRequestContext.receiver?.firstName + " " + this.friendRequestContext.receiver?.lastName;


  

  ngOnInit() {
    this.getNotificationLists();
  }

  constructor(
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private router: Router
  ){
  }

  getNotificationLists() {
    this.notificationService.getNotificationLists().subscribe((response: Notification[]) =>{
      this.notifications = response;
      console.log(this.notifications);

      this.notifications.forEach((notification) => {
        if (notification.notificationType == "like"){
          this.notificationService.getNotificationContext(notification.id!).subscribe((response) => {
            if (notification.notificationType === "like") {
              notification.likeContext = response;
              console.log(response)
              this.likerFullName = notification.likeContext!.liker!.firstName + " " + notification.likeContext!.liker!.lastName;
            }
          })
        }
        else if (notification.notificationType == "comment"){
          // notification.contextUser = this.getNotificationContext(notification.id!, notification.notificationType).commenter;
        }
        else if (notification.notificationType == "add-friend-request"){
          // notification.contextUser = this.getNotificationContext(notification.id!, notification.notificationType).sender;
        }
        else if (notification.notificationType == "accept-friend-request"){
          // notification.contextUser = this.getNotificationContext(notification.id!, notification.notificationType).receiver;

        }
      });
    },
    (error) => {
        console.error("Error fetching notifications", error);
    });
  }


  

 


  // onClick(notificationType?: string) {
  //   switch (notificationType) {
  //     case 'like':
  //       this.router.navigate(['/post' + this.likeContext.postId]); 
  //       break;
  //     case 'comment':
  //       this.router.navigate(['/post' + this.commentContext.postId]); 
  //       break;
  //     case 'add-friend-request':
  //       this.router.navigate(['/user' + this.friendRequestContext.senderId]); 
  //       break;
  //     case 'accept-friend-request':
  //       this.router.navigate(['/user' + this.friendRequestContext.receiverId]); 
  //       break;
  //     default:
  //       return;
  //   }
  // }
  

  markAsRead(notification: Notification) {
    notification.isRead = true;
  }

  markAsUnread(notification: Notification) {
    notification.isRead = false;
  }

  deleteNotification(notification: Notification) {
    this.notificationService.deleteNotification(notification.id!);
    // Perform actions to delete a specific notification
    const index = this.notifications.indexOf(notification);
    // if (index !== -1) {
    //     console.log(index)
    //   this.notifications.splice(index, 1);
    // }

    if (this.notifications.length > 0) {
      this.notifications.shift();
    }

    

  
  }

  deleteAllNotifications() {
    // Perform actions to delete all notifications
    this.notifications.forEach(notification => {
      this.notificationService.deleteNotification(notification.id!);
    });
    this.notifications = [];

  }
}
