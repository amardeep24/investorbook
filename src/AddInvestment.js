import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
    const [ company, setCompany ] = useState(null);
    const [ investment, setInvestment ] = useState(0);
    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add Investment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter the details of the investment.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Select Company"
                        type="text"
                        fullWidth
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Investment Amount"
                        type="number"
                        fullWidth
                        onChange={(e) => setInvestment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.onSubmit({company, investment})} variant="contained" color="primary">
                        Add Company
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}