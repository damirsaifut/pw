import { Component, ElementRef, Input, HostBinding } from "@angular/core";

@Component({
  selector: "ui-col",
  templateUrl: "./col.component.html",
  styleUrls: ["./col.component.less"]
})
export class ColComponent {
  @Input()
  private xs: number | string = 24;
  @Input()
  private sm: number | string = "min";
  @Input()
  private md: number | string;
  @Input()
  private lg: number | string;
  @Input()
  private xl: number | string;
  @Input()
  private align: string;

  constructor(public el: ElementRef) {}

  @HostBinding("class")
  private get bindClass() {
    let arr = [];

    if (this.xs) {
      arr.push("xs-" + this.xs);
    }

    if (this.sm) {
      arr.push("sm-" + this.sm);
    }

    if (this.md) {
      arr.push("md-" + this.md);
    }

    if (this.lg) {
      arr.push("lg-" + this.lg);
    }

    if (this.xl) {
      arr.push("xl-" + this.xl);
    }

    if (this.align) {
      arr.push("align-" + this.align);
    }

    return arr.join(" ");
  }
}
