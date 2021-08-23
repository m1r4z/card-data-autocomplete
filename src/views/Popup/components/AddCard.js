import { Button, Grid, Input } from "@material-ui/core";
import { useState } from "react";
import { CARD_LIST_PAGE } from "../../../common/constant";
import { setDataInStorage } from "../../../common/storageUtil";

const AddCard = (props) => {
	const { storageData, setStorageData, editCard, setEditCard, handleOpenInfoAlert, setPageNo } =
		props;
	const [inputData, setInputData] = useState(
		editCard
			? storageData.card_data[editCard]
			: {
					card_number: "",
					card_cvv: "",
					card_holder_name: "",
					card_expiry_date_month: "",
					card_expiry_date_year: "",
					card_vendor: "default",
			  }
	);

	const handleInputDataSubmit = () => {
		if (Object.values(inputData).reduce((val, item) => val & (item.length > 0), true)) {
			console.log(inputData);
			if (
				(editCard === null && storageData.card_data[inputData.card_number]) ||
				(editCard && storageData.card_data[editCard].card_number !== inputData.card_number)
			) {
				console.log("Card already exist!!", inputData);
				handleOpenInfoAlert("error", "Card already exist!!");
			} else {
				let tempStorageData = {
					...storageData,
					card_data: {
						...storageData.card_data,
						[inputData.card_number]: { ...inputData },
					},
				};
				setStorageData(tempStorageData);
				setDataInStorage(tempStorageData).then(() => {
					console.log("storage data updated!!");
					if (editCard) {
						handleOpenInfoAlert("success", "Card edited successfully!!");
					} else {
						handleOpenInfoAlert("success", "Card added successfully!!");
					}
				});
				setPageNo(CARD_LIST_PAGE);
				setEditCard(null);
			}
		} else {
			console.log("Don't leave any field empty!! ", inputData);
			handleOpenInfoAlert("error", "Don't leave any field empty!!");
		}
	};

	return (
		<fieldset style={{ borderRadius: "10px", borderColor: "#3f51b5" }}>
			<legend style={{ fontSize: 16 }}>
				<b>Add Card</b>
			</legend>
			<div class="add-card">
				<Input
					disabled={!(editCard === null)}
					id="card-number"
					color="default"
					value={inputData.card_number}
					placeholder="Card Number"
					fullWidth={true}
					onChange={(e) =>
						setInputData({
							...inputData,
							card_number: e.target.value,
						})
					}
				/>
				<br />
				<br />
				<Input
					id="card-cvv"
					color="default"
					value={inputData.card_cvv}
					placeholder="CVV"
					fullWidth={true}
					onChange={(e) =>
						setInputData({
							...inputData,
							card_cvv: e.target.value,
						})
					}
				/>
				<br />
				<br />
				<Input
					id="card-holder-name"
					color="default"
					value={inputData.card_holder_name}
					placeholder="Card Holder Name"
					fullWidth={true}
					onChange={(e) =>
						setInputData({
							...inputData,
							card_holder_name: e.target.value,
						})
					}
				/>
				<br />
				<br />
				<b style={{ color: "gray" }}>Expiration date: </b>
				<br />
				<Grid container>
					<Grid xs={5} item>
						<Input
							id="card-expiration-date-month"
							color="default"
							value={inputData.card_expiry_date_month}
							placeholder="Month"
							onChange={(e) =>
								setInputData({
									...inputData,
									card_expiry_date_month: e.target.value,
								})
							}
						/>
					</Grid>
					<Grid xs={1} item></Grid>
					<Grid xs={6} item>
						<Input
							id="card-expiration-date-year"
							color="default"
							value={inputData.card_expiry_date_year}
							placeholder="Year"
							onChange={(e) =>
								setInputData({
									...inputData,
									card_expiry_date_year: e.target.value,
								})
							}
						/>
					</Grid>
				</Grid>
				<br />
				<br />
				<Button
					variant="contained"
					size="small"
					color="primary"
					onClick={() => handleInputDataSubmit()}
				>
					Save Card
				</Button>
			</div>
		</fieldset>
	);
};

export default AddCard;
