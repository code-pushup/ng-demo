export type ReactionData = {
  article_reaction_counts: Reaction[];
}

export type Reaction = {
  category: string;
  count: number;
}
