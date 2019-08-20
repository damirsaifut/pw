import {
  Component,
  Input,
  OnInit,
  ElementRef,
  Renderer,
  ViewEncapsulation
} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "ui-icon",
  templateUrl: "./icon.component.html",
  styleUrls: ["./icon.component.less"],
  encapsulation: ViewEncapsulation.None
})
export class IconComponent implements OnInit {
  @Input()
  public src: string;
  @Input()
  private size: number = 0;
  @Input()
  private sizeX: number = 0;
  @Input()
  private sizeY: number = 0;

  public extension: string;
  public inlineSvg: SVGElement;

  constructor(
    private _http: HttpClient,
    private _renderer: Renderer,
    private _el: ElementRef
  ) {
    this.size = Math.round(this.size);

    if (this.size > 0) {
      this.sizeX = this.size;
      this.sizeY = this.size;
    } else {
      this.sizeX = Math.round(this.sizeX);
      this.sizeY = Math.round(this.sizeY);
    }
  }

  ngOnInit() {
    if (this.src.length > 0) {
      this.extension = this.src.split(".").pop();
    }

    if (this.extension === "svg") {
      this._http.get(this.src, { responseType: "text" }).subscribe(res => {
        this._el.nativeElement.innerHTML = res;
      });
    }
  }
}
