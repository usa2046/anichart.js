import { csv } from "d3";
import { csvParse, DSVRowArray } from "d3-dsv";
import { GroupComponent } from "./group";
import * as fs from "fs";
import { Component } from "./component";
import { ChartInterface } from "./chart-interface";

export abstract class ChartCompoment
  extends GroupComponent
  implements ChartInterface {
  components: Component[] = [];
  async loadData(path: string | any): Promise<void> {
    this.hinter.drawHint("Loading Data...");
    this.data = await this.readCsv(path);
    this.hinter.drawHint("Loading Data...Finished!");
    if (this.components) {
      this.hinter.drawHint(`Refresh Components...`);
      this.update();
      this.components.forEach((c) => {
        c.update();
      });
      this.hinter.drawHint("Refresh Components... Finished!");
    }
  }
  update(option?: any) {
    super.update(option);
    if (this.components) {
      this.components.forEach((c) => {});
    }
  }
  private async readCsv(path: string | any): Promise<DSVRowArray<string>> {
    if (typeof path !== "string") {
      path = path.default;
    }
    if (typeof window === "undefined") {
      return csvParse(fs.readFileSync(path).toString());
    } else {
      if ("object" == typeof path) {
        return csv(path);
      }
      return csv(path);
    }
  }
  async loadMeta(path: string | any): Promise<void> {
    this.player.renderer.hinter.drawHint("Loading Meta...");
    this.meta = await this.readCsv(path);
    this.player.renderer.hinter.drawHint("Loading Data...Finished!");
    if (this.components) {
      this.player.renderer.hinter.drawHint(`Refresh Components...`);
      this.components.forEach((c) => {
        c.update();
      });
      this.player.renderer.hinter.drawHint("Refresh Components... Finished!");
    }
  }
  data: DSVRowArray<string>;
  meta: DSVRowArray<string>;
}