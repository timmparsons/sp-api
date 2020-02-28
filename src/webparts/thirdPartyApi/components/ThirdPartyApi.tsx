import * as React from 'react';  
import {sp} from '@pnp/sp';  
import { IThirdPartyApiProps } from './IThirdPartyApiProps';  
import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';  
export interface IthirdpartyState {    
  ApiOutput?:any[];  
}   
export default class ThirdpartyApi extends React.Component<IThirdPartyApiProps, IthirdpartyState> {  
  constructor(props: IThirdPartyApiProps, state: IthirdpartyState) {  
    super(props);  
    this.state = {  
      ApiOutput: []  
    };  
  }  
    
  /*async  PnpfilePermission(id, arrayId, title){ 
    const list = sp.web.getList(`/sites/site/Lists/List`); 
    const item = list.items.getById(3); 
   
    /* 
    const folder = sp.web.getFolderByServerRelativePath('Shared%20Documents/some_folder'); 
    const folderItem = await folder.getItem(); 
   
    const file = sp.web.getFileByServerRelativePath('Shared%20Documents/some_file.docx'); 
    const fileItem = await file.getItem(); 
    */  
    
    // Break role inheritence for unique permissions  
   /* await item.breakRoleInheritance(false); // Method receives params 
   
    // Get user/group proncipal Id 
    const { Id: principalId } = await sp.web.currentUser.select('Id').get(); 
    // Get role definition Id 
    const { Id: roleDefId } = await sp.web.roleDefinitions.getByName('Edit').get(); 
   
    // Assigning permissions 
    await item.roleAssignments.add(principalId, roleDefId); 
   
    console.log(`Done`); 
     
    }*/  
  public componentDidMount(){  
    var myoutput = [];  
    this._getthirdpartyApi()  
    .then(response => {  
      myoutput.push(response);  
      this.setState({ ApiOutput: myoutput });  
    });  
  }  
  private _getthirdpartyApi(): Promise<any> {  
    return this.props.myhttpclient  
    .get(  
      'https://jsonplaceholder.typicode.com/photos',  
      HttpClient.configurations.v1  
    )  
    .then((response: HttpClientResponse) => {  
      return response.json();  
    })  
    .then(jsonResponse => {  
      console.log(jsonResponse);  
      return jsonResponse;  
    }) as Promise<any>;  
  }   
  public render(): React.ReactElement<IThirdPartyApiProps> {  
    return (  
      <div >  
        { this.state.ApiOutput[0] && <Bindvalue bindoutput={this.state.ApiOutput[0]} />}  
      </div>  
    );  
  }  
}  
const Bindvalue = (props) => {  
  const Bindedcontent = props.bindoutput.map((httpapi,index) =>  
    <div key={index}>  
  <span>{httpapi.id}</span><br></br>  
  <span>{httpapi.title}</span><br></br>  
  <span>{httpapi.url}</span><br></br>  
    </div>  
  );  
  return (  
    <div>  
      {Bindedcontent}  
    </div>  
  );  
};