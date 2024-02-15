// This file serves as a definition for any kind
// of "magic strings" or "magic numbers" that might 
// need to exist for the codebase. Defining them all 
// here in one place.

export const GAME_TYPE_HUMAN_VS_HUMAN       :number = 1;
export const GAME_TYPE_YOU_AS_BLACK         :number = 2;
export const GAME_TYPE_YOU_AS_WHITE         :number = 3;
export const GAME_TYPE_SELF_PLAY            :number = 4;

export const CSS_CLASS_NAME_BOARD           :string = 'board';
export const CSS_CLASS_NAME_BLACK           :string = 'black';
export const CSS_CLASS_NAME_WHITE           :string = 'white';
export const CSS_CLASS_NAME_PLAYABLE        :string = 'playable-';
export const CSS_CLASS_NAME_PLAYABLE_BLACK  :string = 'playable-black';
export const CSS_CLASS_NAME_PLAYABLE_WHITE  :string = 'playable-white';
export const CSS_CLASS_NAME_MOST_RECENT_MOVE:string = 'most-recent-move';
export const CSS_CLASS_NAME_IS_THEIR_TURN   :string = 'is-their-turn';
export const CSS_ELEMENT_ID_MOVES_SELECT    :string = 'moves-select';
export const CSS_ELEMENT_ID_MOVES_PLAYED    :string = 'moves-played-text';
export const CSS_ELEMENT_ID_TOGGLE_MOVE_LOG :string = 'btnToggleMoveLogVisibility';
export const CSS_ELEMENT_ID_BOARD           :string = 'board';
export const CSS_ELEMENT_ID_NEW_GAME_HVH    :string = 'btnNewGameHumanVsHuman';
export const CSS_ELEMENT_ID_NEW_GAME_YAB    :string = 'btnNewGameAsBlack';
export const CSS_ELEMENT_ID_NEW_GAME_YAW    :string = 'btnNewGameAsWhite';
export const CSS_ELEMENT_ID_NEW_GAME_SPL    :string = 'btnNewGameSelfPlay';
export const CSS_CLASS_NAME_MOVES_CONTAINER :string = 'moves-container';
export const CSS_CLASS_BLACK_PIECE_COUNT    :string = 'black-piece-count';
export const CSS_CLASS_WHITE_PIECE_COUNT    :string = 'white-piece-count';

export const LOGGING_ENABLED                :boolean = true;

export const MIN_COLUMN_CHAR_AS_NUM         :number = 'a'.charCodeAt(0);
export const MAX_COLUMN_CHAR_AS_NUM         :number = 'h'.charCodeAt(0);
export const MIN_ROW_NUM                    :number = 1;
export const MAX_ROW_NUM                    :number = 8;