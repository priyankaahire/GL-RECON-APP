export interface ReconModel {
    reconId: number;
    reconName: string;
    source: string;
    target: string;
    status: string;
    createdBy: string;
    createdOn: Date;
    isEditMode?: boolean;
    hasError?:boolean;
  }

  export interface KeysModel {
    id:string;
    Recon_Id:string,
    Src_Tbl_Key:string;
    Trgt_Tbl_Key: string;
    Var_Tbl_Key: string;
    Adj_Tbl_Key: string;
    Create_UserId?:string;
    Created_Timestamp?:string;
    Last_Updated_UserID?: string;
    Last_Update_Timestamp?: string;
   
  }
  export interface MeasuresModel {
    id:string;
    Recon_Id:string,
    Src_Tbl_Measure:string;
    Trgt_Tbl_Measure: string;
    Var_Tbl_Measure: string;
    Adj_Tbl_Measure: string;
    Create_UserId?:string;
    Created_Timestamp?:string;
    Last_Updated_UserID?: string;
    Last_Update_Timestamp?: string;

  }

  export interface FilterParams { 
    page: number;
    page_size: number;
    sort_key: string;
    sort_order: 'asc' | 'desc';
    search_query: string;
  }

