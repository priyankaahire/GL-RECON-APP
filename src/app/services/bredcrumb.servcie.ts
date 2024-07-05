// breadcrumb.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface BreadcrumbItem {
  label: string;
  route?: string; // Optional route link
}

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {
  private breadcrumbs: BehaviorSubject<BreadcrumbItem[]> = new BehaviorSubject<BreadcrumbItem[]>([]);

  constructor() {}

  getBreadcrumbs(): BehaviorSubject<BreadcrumbItem[]> {
    return this.breadcrumbs;
  }

  setBreadcrumbs(breadcrumbs: BreadcrumbItem[]): void {
    this.breadcrumbs.next(breadcrumbs);
  }

  addBreadcrumb(breadcrumb: BreadcrumbItem): void {
    const currentBreadcrumbs = this.breadcrumbs.getValue();
    const updatedBreadcrumbs = [...currentBreadcrumbs, breadcrumb];
    this.breadcrumbs.next(updatedBreadcrumbs);
  }

  clearBreadcrumbs(): void {
    this.breadcrumbs.next([]);
  }
}
