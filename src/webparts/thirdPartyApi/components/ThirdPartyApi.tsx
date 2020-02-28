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