import React from 'react';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const MCQ_Function = ({ MCQ_quesdetails, DeleteMCQ_quesdetails }) => {
  const MCQ_queslist = MCQ_quesdetails.map(MCQ_ques => {
    return (
      <div key={MCQ_ques.id}>
        <Grid container>
          <Grid item xs={3}>
            <div> Question: {MCQ_ques.MCQ_ques} </div></Grid>
          <Grid item xs={3}>
             <Grid item xs={5}><div> Option:  </div></Grid>
            {MCQ_ques.MCQ_option.map(function (MCQ_option, i) {
              return <div key={i}>
                <Grid item xs={7}>
                  <span>{MCQ_option}</span></Grid>
              </div>
            })}</Grid>
          <Grid item xs={3}>
            <div> Answer: {MCQ_ques.MCQ_Answer} </div>
          </Grid>
          <Grid item xs={3}>
            <Button variant="contained" color="primary" onClick={() => { DeleteMCQ_quesdetails(MCQ_ques.id) }}> Delete </Button>
          </Grid>
        </Grid>
      </div>
    )
  }
  )
  return (
    <div style={{ paddingTop: "50px" }}>
          <div className="container">
        <div  style={{ background: "#cce6ff", width: "100%" }}>
      {MCQ_queslist}
    </div>
    </div></div>
  )

}
export default MCQ_Function;