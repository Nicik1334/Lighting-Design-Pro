export interface DictionaryItemType {
  id: number;
  name: string;
  code: string;
  status: number;
  remark: string;
}

export interface DicValueItemType {
  id: number;
  type_id: number;
  label: string;
  value: string;
  code: string;
  sort: number;
  status: number;
  created_at: string;
  updated_at: string;
  remark: string;
}
