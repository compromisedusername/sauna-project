import React from "react";
import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";
export default function UserPanel() {
	const navigate = useNavigate();

	const { t } = useTranslation<"pl" | "en">();
	return (
		<div className="container">
			<h2 className="title">
				{
					// @ts-ignore
					t("userdashboard")
				}
			</h2>

			<p className="click">
				{
					// @ts-ignore
					t("clicktoseereservations")
				}
			</p>
			<button
				className="action-button"
				onClick={() => navigate("/user/reservations")}
			>
				{
					// @ts-ignore
					t("seereservations")
				}
			</button>

			<p className="click">
				{
					// @ts-ignore
					t("clicktomakereservation")
				}
				<button
					className="action-button"
					onClick={() => navigate("/user/reservation/add")}
				>
					{
						// @ts-ignore
						t("makereservation")
					}
				</button>
			</p>

			<p className="click">
				{
					// @ts-ignore
					t("clicktoseesaunas")
				}
				<button
					className="action-button"
					onClick={() => navigate("/about/saunas")}
				>
					{
						// @ts-ignore
						t("seesaunas-btn")
					}
				</button>
			</p>

			<p className="click">
				{
					// @ts-ignore
					t("clicktoeditaccount")
				}
				<button
					className="action-button"
					onClick={() => navigate("/user/edit")}
				>
					{
						// @ts-ignore
						t("editaccount")
					}
				</button>
			</p>
		</div>
	);
}
