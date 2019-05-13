import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import StringInput from "./components/StringInput"
import SelectInput from "./components/SelectInput"
import Bidness from "./components/Bidness"
import styled from 'styled-components';

const BidnessDisplay = styled.div`
  display:flex;
  justify-content:center;
  flex-wrap:wrap;
`

const FilterWrapper = styled.div`
display:flex;
flex-direction:column;
padding:3em;
justify-content:center;
align-items:center;

`

class App extends React.Component {
  state = {
    bidnesses:[],
    boroughs:[],
    filter_string:'',
    filter_borough:'',
    filter_typeofbusiness:'',
    filter_sub_typeofbusiness:'',
    filteredBidnesses:[],
    endpoint: "https://natespilman.tech/wlbny/"
  };
    async getBusiness(){
    const response = await fetch(this.state.endpoint);
    const bidnessArray = await response.json();
    console.log(bidnessArray)
    this.setState({bidnesses:bidnessArray})
        }
    
  getUnique = (bidnesses,category) =>{
      const outputRaw = bidnesses.map(bidness => {return bidness[category]})
      const output = []
      if(outputRaw){
      outputRaw.forEach(outputCollection =>{
        if(outputCollection && typeof outputCollection != 'string'){
        outputCollection.forEach(value => {
          if(value.trim().length > 0){
            output.push(value.trim())
          }})          
        }
        if(typeof outputCollection == "string"){
          output.push(outputCollection)
        }
      })}
      return [...new Set(output)]
    }

inputFilter(bidnesses){
  return bidnesses.filter(bidness => bidness.name.toLowerCase().includes(this.state.filter_string) || bidness.typeofbusiness.some(type => type.toLowerCase().includes(this.state.filter_string)))
}

categoryFilter(bidnesses,category){
  return this.state['filter_' + category] !== "" ? bidnesses.filter(bidness => bidness[category].some(value => value.trim() === this.state['filter_'+ category])) : bidnesses
}

updateInputString = (string) => {
  this.setState({filter_string:string.toLowerCase()})
}

updateFilterBorough = (value) => {
  this.setState({filter_borough:value})
}

updateFilterTypeOfBusiness = (value) => {
  this.setState({filter_typeofbusiness:value})
}

updateFilterBorough = (value) => {
  this.setState({filter_borough:value})
}

filterBusinesses(){
 const boroughFilterOutput = this.categoryFilter(this.state.bidnesses,'borough')
 const typeFilterOutput = this.categoryFilter(boroughFilterOutput,'typeofbusiness')
 const inputFilterOutput = this.inputFilter(typeFilterOutput)
 return inputFilterOutput
}

everythingButBoroughFilter(){
  const typeFilterOutput = this.categoryFilter(this.state.bidnesses,'typeofbusiness')
  const inputFilterOutput = this.inputFilter(typeFilterOutput)
  return inputFilterOutput
}

everythingButTypeFilter(){
  const boroughFilterOutput = this.categoryFilter(this.state.bidnesses,'borough')
  const inputFilterOutput = this.inputFilter(boroughFilterOutput)
  return inputFilterOutput
}

showSubTypes(){
  return this.state.filter_typeofbusiness !== '' ? this.getUnique(this.filterBusinesses(),'sub_typeofbusiness') : []
}

componentDidMount(){
  this.getBusiness()
}

render(){
  return (
    <div className="App">
    <FilterWrapper>
      <h2>Find Yo'self a Women Led Bidness</h2>
        <StringInput update={this.updateInputString}/>
        <SelectInput update = {this.updateFilterBorough} currentVal = {this.state.filter_borough} title = "borough" options = {this.getUnique(this.everythingButBoroughFilter(),'borough')}/>
        <SelectInput currentVal = {this.state.filter_typeofbusiness} update = {this.updateFilterTypeOfBusiness}  title = "business type" options = {this.getUnique(this.everythingButTypeFilter(),'typeofbusiness')}/>
        <SelectInput currentVal = {this.state.filter_sub_typeofbusiness} update = {this.updateFilterTypeOfBusiness}  title = "business sub-type" options = {this.showSubTypes()}/>
    </FilterWrapper>
      <BidnessDisplay>
        {this.filterBusinesses().map(bidness =>{
          return <Bidness bidness = {bidness} key={bidness.name}/>
          })}
      </BidnessDisplay>
    </div> 
  );
}
}
export default App;
