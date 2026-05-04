export interface FriendDto {
  id: number;
  name: string;
  gender: string;
}

export interface FriendEventDto {
  id: number;
  tableName: string;
  columnName: string;
  oldValue: string | null;
  newValue: string | null;
  rowId: number;
  eventType: string;
  createdAt: string;
}