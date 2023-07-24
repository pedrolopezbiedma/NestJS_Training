import { Controller, Get } from "@nestjs/common";

@Controller("/app")
export class AppController {
  @Get("/hello")
  getRootRoute(): string {
    return "Hi there :-D !";
  }

  @Get("/bye")
  getByeThere(): string {
    return "Bye There :-D!";
  }
}
