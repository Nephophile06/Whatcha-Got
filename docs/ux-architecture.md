# Product / UX Architecture

Here’s a simple product/UX architecture for the current **Whatcha Got?** prototype:

```text
                       WHATCHA GOT?
                            |
            +---------------+--------------------+
            |               |                |
        Discovery        Planning          Saved
            |               |                |
        +---+---+           |           +----+----------+
        |   |   |           |           |               |
   Ingredients Mood Time  Weekly Plan   Favorites     Offline
        |   |   |           |
        +---+---+           |
            |               |
            ↓               ↓
       Suggestions      Meal Plan
            |               |
            +-------+-------+
                    |
                    ↓
                  Recipe
```

`Note:` This diagram represents the product/UX architecture of the current prototype. It does not represent a production backend or recommendation-engine implementation.
