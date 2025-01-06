import { SaunaDto } from "../../models/Sauna";
import { useState } from "react";

import {useTranslation}from 'react-i18next'
interface SaunaDetailsProps {
  sauna: SaunaDto;
  onClose: () => void;
}

const SaunaDetails: React.FC<SaunaDetailsProps> = ({ sauna, onClose }) => {
const {t} = useTranslation<'pl'|'en'>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPagesize] = useState<number>(5);
  const totalReservations = sauna.reservations?.length || 0;
  const totalPages = Math.ceil(totalReservations / pageSize);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const reservationsOnPage =
    sauna.reservations?.slice(startIndex, endIndex) || [];

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPagesize(Number(e.target.value));
  };

  return (
    <div className="container">
      <h3 className="title">
 {//@ts-ignore
            t('details')}
      </h3>
      <table className="table">
        <thead className="table-header">
          <tr className="table-header-row">
            <th className="table-header-cell">Sauna ID</th>
            <th className="table-header-cell">
 {//@ts-ignore
            t('name')}
            </th>
            <th className="table-header-cell">
 {//@ts-ignore
            t('type')}
            </th>
            <th className="table-header-cell">
 {//@ts-ignore
            t('humidity')}

            </th>
            <th className="table-header-cell">
 {//@ts-ignore
            t('temperature')}
            </th>
            <th className="table-header-cell">
 {//@ts-ignore
            t('peopleCapacity')}

            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="table-row">
            <td className="table-cell">{sauna.id}</td>
            <td className="table-cell">{sauna.name}</td>
            <td className="table-cell">{sauna.saunaType}</td>
            <td className="table-cell">{sauna.humidity}%</td>
            <td className="table-cell">{sauna.temperature}°C</td>
            <td className="table-cell">{sauna.peopleCapacity} people</td>
          </tr>
        </tbody>
      </table>
      <h4 className="title">
 {//@ts-ignore
            t('reservations')}
        :</h4>
      {sauna.reservations?.length > 0 ? (
        <>
          <table className="table">
            <thead className="table-header">
              <tr className="table-header-row">
                <th className="table-header-cell">ID</th>
                <th className="table-header-cell">
 {//@ts-ignore
            t('from')}
                </th>
                <th className="table-header-cell">
 {//@ts-ignore
            t('to')}

                </th>
                <th className="table-header-cell">
 {//@ts-ignore
            t('people')}

                </th>
              </tr>
            </thead>
            <tbody>
              {reservationsOnPage.map(reservation => (
                <tr key={reservation.id} className="table-row">
                  <td className="table-cell">{reservation.id}</td>
                  <td className="table-cell">{new Date(reservation.dateFrom).toLocaleString()}</td>
                  <td className="table-cell">{new Date(reservation.dateTo).toLocaleString()}</td>
                  <td className="table-cell">{reservation.numberOfPeople}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="add-form">
            <button
              className="action-button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
             {//@ts-ignore
            t('prev')}
            </button>
            <span className="details-page-info">
               {//@ts-ignore
            t('page')} {currentPage} of {totalPages}
            </span>
            <button
              className="action-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
               {//@ts-ignore
            t('next')}
            </button>
            <span className="form-label">
               {//@ts-ignore
            t('pagesize')}:</span>
            <select style={{width: "50px"}}
              className="select"
              value={pageSize}
              onChange={handlePageSizeChange}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </>
      ) : (
        <p className="no-data">
 {//@ts-ignore
            t('nodata')}

          </p>
      )}
      <button className="back-button" onClick={onClose}>
 {//@ts-ignore
            t('close')}

      </button>
    </div>
  );
};

export default SaunaDetails;
