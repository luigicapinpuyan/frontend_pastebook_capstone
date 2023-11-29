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
  private userId: number = Number(this.sessionService.getUserId());
  notifications: Notification[] = [];
  likeContext: Like = new Like();
  commentContext: Comment = new Comment();
  friendRequestContext: Friend = new Friend();
  notificationType: string = "";

  likeContexts: Like[] = [];
  commentContexts: Comment[] = [];
  friendRequestContexts: Friend[] = [];


  likerFullName: string = this.likeContext.liker?.firstName + " " + this.likeContext.liker?.lastName;
  commenterFullName: string = this.commentContext.commenter?.firstName + " " + this.commentContext.commenter?.lastName;
  requesterFullName: string = this.friendRequestContext.sender?.firstName + " " + this.friendRequestContext.sender?.lastName;
  receiverFullName: string = this.friendRequestContext.receiver?.firstName + " " + this.friendRequestContext.receiver?.lastName;


  // notifications: any[] = [
  //   { sender: 'Blessie Balagtas', action: "liked", type: 'photo', read: false },
  //   { sender: 'John Bernard Tinio', action: "commented on", type: 'post', read: false },
  //   { sender: 'Jigs Capinpuyan', action: "liked", type: 'post', read: false }
  //   // Add more notifications as needed
  // ];

  ngOnInit() {
    for (const notification of this.notifications) {
      // this.getNotificationContext(notification.id, notification.notificationType);
    }
  }

  constructor(
    private sessionService: SessionService,
    private notificationService: NotificationService,
    private router: Router
  ){
    // this.getNotificationLists(this.userId);
    this.notifications.forEach(element => {
      
    });
  }
  getNotificationLists(userId: number) {
    this.notificationService.getNotificationLists().subscribe((response: Notification[]) =>{
      this.notifications = response;
    },
    (error) => {
        console.error("Error fetching notifications", error);
    });
    this.notifications.forEach(notification => {
      // this.getNotificationContext(notification.contextId, notification.notificationType);
    });
  }

  getNotificationContext(contextId: number | undefined, notificationType?: string) {
    this.notificationService.getNotificationContext(contextId).subscribe(
      (response) => {
        if (notificationType === "like") {
          this.likeContexts.push(response as Like);
        } else if (notificationType === "comment") {
          this.commentContexts.push(response as Comment);
        } else if (notificationType === "add-friend-request" || notificationType === "accept-friend-request") {
          this.friendRequestContexts.push(response as Friend);
        }
      },
      (error) => {
        console.error("Error fetching notifications", error);
      }
    );
  }


  onClick(notificationType?: string) {
    switch (notificationType) {
      case 'like':
        this.router.navigate(['/post' + this.likeContext.postId]); 
        break;
      case 'comment':
        this.router.navigate(['/post' + this.commentContext.postId]); 
        break;
      case 'add-friend-request':
        this.router.navigate(['/user' + this.friendRequestContext.senderId]); 
        break;
      case 'accept-friend-request':
        this.router.navigate(['/user' + this.friendRequestContext.receiverId]); 
        break;
      default:
        return;
    }
  }
  

  markAsRead(notification: Notification) {
    notification.isRead = true;
  }

  markAsUnread(notification: Notification) {
    notification.isRead = false;
  }

  deleteNotification(notification: Notification) {
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
    this.notifications = [];
  }
}
