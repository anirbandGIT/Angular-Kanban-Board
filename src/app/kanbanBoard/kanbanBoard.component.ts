import { ClassGetter } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "kanban-board",
  templateUrl: "./kanbanBoard.component.html",
  styleUrls: ["./kanbanBoard.component.scss"],
})
export class KanbanBoard implements OnInit {
  tasks: Task[];
  stagesNames: string[];
  stagesTasks: any[]; //Only used for rendering purpose
  inputValue;

  ngOnInit() {
    // Each task is uniquely identified by its name.
    // Therefore, when you perform any operation on tasks, make sure you pick tasks by names (primary key) instead of any kind of index or any other attribute.
    this.tasks = [
      { name: "0", stage: 0 },
      { name: "1", stage: 0 },
    ];
    this.stagesNames = ["Backlog", "To Do", "Ongoing", "Done"];
    this.configureTasksForRendering();
  }

  // this function has to be called whenever tasks array is changed to construct stagesTasks for rendering purpose
  configureTasksForRendering = () => {
    this.stagesTasks = [];
    for (let i = 0; i < this.stagesNames.length; ++i) {
      this.stagesTasks.push([]);
    }
    for (let task of this.tasks) {
      const stageId = task.stage;
      this.stagesTasks[stageId].push(task);
    }
  };

  generateTestId = (name) => {
    return name.split(" ").join("-");
  };

  getInputValue(event) {
    this.inputValue = event.target.value;
  }

  createTask(): void {
    if (this.inputValue) {
      const task = { name: this.inputValue, stage: 0 };
      this.stagesTasks[task.stage].push(task);
    }
  }

  demoteTask(i, name): void {
    let task;
    let index;
    this.stagesTasks[i].forEach((element, index) => {
      if (name === element.name) {
        task = { ...element };
        index;
      }
    });

    if (task.stage > 0) {
      task.stage -= 1;
      this.stagesTasks[i].splice(index, 1);
      this.stagesTasks[task.stage].push(task);
    }

    console.log(this.stagesTasks);
  }

  promoteTask(i, name): void {
    let task;
    let index;
    this.stagesTasks[i].forEach((element, index) => {
      if (name === element.name) {
        task = { ...element };
        index;
      }
    });

    if (task.stage < 3) {
      task.stage += 1;
      this.stagesTasks[i].splice(index, 1);
      this.stagesTasks[task.stage].push(task);
    }

    console.log(this.stagesTasks);
  }

  deleteTask(i, name): void {
    let task;
    let index;
    this.stagesTasks[i].forEach((element, index) => {
      if (name === element.name) {
        task = { ...element };
        index;
      }
    });
    this.stagesTasks[i].splice(index, 1);

    console.log(this.stagesTasks);
  }
}

interface Task {
  name: string;
  stage: number;
}
