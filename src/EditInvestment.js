import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default (props) => {
    const [company, setCompany] = useState("");
    const [investment, setInvestment] = useState(0);
    const { name, amount } = props.investment || {};

    useEffect(() => {
        if (name !== company) {
            setCompany(name);
        }
        if (investment !== amount) {
            setInvestment(amount);
        }
    }, [name, amount]);

    return (
        <div>
            <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit Investment</DialogTitle>
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
                        value={company}
                        disabled
                    />
                    <TextField
                        margin="dense"
                        id="name"
                        label="Investment Amount"
                        type="number"
                        fullWidth
                        value={investment}
                        onChange={(e) => setInvestment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.onClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => props.onSubmit({ id: props.investment.id, name: company, amount: investment })} variant="contained" color="primary">
                        Save Company
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );

}