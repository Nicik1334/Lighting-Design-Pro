import type { RefObject } from 'react';
import { createContext } from 'react';

export type TagContextProps = {
  rootRef?: RefObject<HTMLDivElement>;
};

const TagContext = createContext<TagContextProps>({});

export default TagContext;
