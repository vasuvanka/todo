import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { StorageService } from 'src/app/core/services/storage.service';
import { Todo } from 'src/app/models/todo';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

const TODO = 'TODO';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit, OnDestroy {
  todoForm: FormGroup = new FormGroup({
    todo: new FormControl('', [Validators.required]),
  });
  disableEmail = true;
  get todo(): AbstractControl {
    return this.todoForm.get('todo') as AbstractControl;
  }
  todos: Todo[] = [];
  progress: number = 0;
  bufferValue: number = 0;

  constructor(private storageService: StorageService) {}

  async ngOnInit(): Promise<void> {
    const todos = await this.storageService.getItem(TODO);
    this.todos = JSON.parse(todos) || [];
    this.caliculateProgress();
  }

  async addTodo(task: string): Promise<void> {
    this.todos.unshift({
      task,
      done: false,
      created: new Date(),
      completed: undefined,
    });
    this.todoForm.reset({});
    this.todoForm.markAsUntouched();
    this.caliculateProgress();
    await this.storageService.setItem(TODO, JSON.stringify(this.todos));
  }

  async markTodo(index: number, done: boolean): Promise<void> {
    this.todos[index].done = done;
    this.todos[index].completed = new Date();
    this.caliculateProgress();
    await this.storageService.setItem(TODO, JSON.stringify(this.todos));
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  async ngOnDestroy(): Promise<void> {
    await this.storageService.setItem(TODO, JSON.stringify(this.todos));
  }

  async removeTodo(index: number): Promise<void> {
    this.todos.splice(index, 1);
    this.caliculateProgress();
    await this.storageService.setItem(TODO, JSON.stringify(this.todos));
  }

  caliculateProgress() {
    const taskNo = this.todos.length;
    const doneTaskNo = this.todos.filter((t) => t.done).length;
    const progressUnit = Math.round(100 / taskNo);
    this.progress = Math.round(progressUnit * doneTaskNo);
    this.bufferValue = this.progress / 2;
  }
}
