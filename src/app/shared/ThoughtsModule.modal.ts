export class ThoughtsModule {
    public text: string
    public author?: string
}

export interface ShortThoughts {
    short_thoughts: ThoughtsModule[];
  }