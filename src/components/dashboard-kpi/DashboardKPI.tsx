import { Tooltip } from '@mui/material';
import React from 'react';
import { FaCheckDouble, FaCheckToSlot, FaHeadSideMask, FaMoneyBill, FaMoneyBillTrendUp, FaPenRuler, FaPeopleRoof, FaPersonDigging, FaSitemap, FaUsers, FaUserXmark } from 'react-icons/fa6';
import { GrAchievement, GrAction, GrAtm, GrMoney, GrPaypal, GrRedo, GrShare, GrShareOption, GrShareRounded } from "react-icons/gr";

type Props = {
  title: string;
  value: any;
  originalValue: any;
  icon: string
};

const DashboardKPI = (props: Props) => {
  const { title, value, originalValue, icon } = props
  // Single KPI data
  const kpi = {
    title: title,
    value: value,
    originalValue: originalValue,
    customGradient: 'linear-gradient(270deg, #6AD2D4 0%, #A3A8FE 81.54%, #FFA6FA 163.08%)',
  };

  return (
    
      <div
        className="p-6 rounded-lg shadow-lg"
        style={{ background: kpi.customGradient }}
      >
        <div className="flex items-center justify-between">
          <div>
            <Tooltip title={kpi.originalValue} arrow placement="right">
              <p className="text-white font-bold text-4xl inline">{kpi.value}</p>
            </Tooltip>
            <h3 className="text-white text-lg font-semibold mt-2 mr-4">{kpi.title}</h3>
          </div>
          <div>
            {icon === 'user' &&
              <FaUsers size={40} color="white" />
            }
            {icon === 'payment' &&
              <FaMoneyBillTrendUp size={40} color="white" />
            }
            {icon === 'Total Share Count' &&
              <GrShareOption size={40} color="white" />
            }
            {icon === 'Referral Analytics Pending' &&
              <FaPeopleRoof size={40} color="white" />
              // <img src="../../../public/images/icons/check_dark.svg" alt="" />
            }
            {icon === 'Referral Analytics Complete' &&
              <FaSitemap size={40} color="white" />
            }
          </div>
        </div>
      </div>
  );
};

export default DashboardKPI;
