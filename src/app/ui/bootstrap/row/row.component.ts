import {
  Component,
  ElementRef,
  AfterViewInit,
  Input,
  HostBinding,
  ContentChildren,
  QueryList
} from "@angular/core";
import { ColComponent } from "../col/col.component";

@Component({
  selector: "ui-row",
  templateUrl: "./row.component.html",
  styleUrls: ["./row.component.less"]
})
export class RowComponent implements AfterViewInit {
  @Input()
  private nowrap: boolean = false;
  @Input()
  private align: string = "middle";
  @Input()
  private justify: string = "space-between";
  @Input()
  private gutter: number = 0;
  @Input()
  private gutterX: number = 0;
  @Input()
  private gutterY: number = 0;

  @ContentChildren(ColComponent)
  columns: QueryList<ColComponent>;

  constructor(public el: ElementRef) {
    this.gutter = Math.round(this.gutter);

    if (this.gutter > 0) {
      this.gutterX = this.gutter;
      this.gutterY = this.gutter;
    } else {
      this.gutterX = Math.round(this.gutterX);
      this.gutterY = Math.round(this.gutterY);
    }
  }

  @HostBinding("class")
  get bindClass() {
    let arr = [];

    if (this.nowrap) {
      arr.push("no-wrap");
    }

    if (this.align) {
      arr.push("align-" + this.align);
    }

    if (this.justify) {
      arr.push("justify-" + this.justify);
    }

    return arr.join(" ");
  }

  ngAfterViewInit(): void {
    if (this.gutterX > 0) {
      this.el.nativeElement.style.marginLeft = -this.gutterX + "px";
      this.el.nativeElement.style.marginRight = -this.gutterX + "px";
    }

    if (this.gutterY > 0) {
      this.el.nativeElement.style.marginLeft = -this.gutterY + "px";
      this.el.nativeElement.style.marginRight = -this.gutterY + "px";
    }

    if (this.gutterX > 0 || this.gutterY > 0) {
      this.columns.forEach(col => {
        if (this.gutterX > 0) {
          col.el.nativeElement.style.paddingLeft = this.gutterX + "px";
          col.el.nativeElement.style.paddingRight = this.gutterX + "px";
        }

        if (this.gutterY > 0) {
          col.el.nativeElement.style.paddingTop = this.gutterY + "px";
          col.el.nativeElement.style.paddingBottom = this.gutterY + "px";
        }
      });
    }
  }
}
