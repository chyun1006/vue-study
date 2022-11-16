<template>
  <div>
    <h1>{{ message }}</h1>

    <RenderCom title="submit"></RenderCom>
    <ul>
      <li v-for="item in arrs" :key="item.name">{{ item.name }}</li>
    </ul>
    <button @click="changeArr">click</button>

    {{ a }}
    <button @click="chaneg">chage</button>
    <!-- <SlotTest>
      <div slot="a">asd</div>
    </SlotTest> -->

    <VTable :columns="cols" :dataSource="dataSource"></VTable>

    <div class="table">
      <div class="header">
        <div class="row" style="display:flex">
          <div class="td">
            <div>123</div>
          </div>
          <div class="td">123</div>
          <div class="td">123</div>
        </div>
      </div>
    </div>

    <button @click="broadcast">broadcast</button>
  </div>
</template>
<script>
import RenderCom from '@/components/RenderCom'
// import SlotTest from '@/components/SlotTest'
// import createScroller from '@/components/VTable/index.js'
import VTable from '@/components/MyTable'
const cols = [
  {
    children: [
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    fieldInfo: {
      aggType: '',
      dateType: '',
      field: 't_2.dep_airport',
      fieldDataType: 'STRING',
      fieldDisplayAlias: '起飞机场',
      fieldType: 'SINGLE',
      sortType: 'DESC',
    },
    rowId: 1,
    title: '起飞机场',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_URC_票价',
        fieldInfo: {
          aggType: 'SUM',
          dateType: '',
          field: 't_2.ticket_price',
          fieldDataType: 'NUMBER',
          fieldDisplayAlias: '票价',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '起飞机场_URC_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_URC',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_URC',
    rowId: 2,
    sortIndex: 1,
    title: 'URC',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_LHW_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_LHW_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_LHW',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_LHW',
    rowId: 3,
    sortIndex: 2,
    title: 'LHW',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_HET_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_HET_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_HET',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_HET',
    rowId: 4,
    sortIndex: 3,
    title: 'HET',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_KMG_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_KMG_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_KMG',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_KMG',
    rowId: 5,
    sortIndex: 4,
    title: 'KMG',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_JHG_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_JHG_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_JHG',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_JHG',
    rowId: 6,
    sortIndex: 6,
    title: 'JHG',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_SZX_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_SZX_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_SZX',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_SZX',
    rowId: 7,
    sortIndex: 7,
    title: 'SZX',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_CAN_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_CAN_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_CAN',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_CAN',
    rowId: 8,
    sortIndex: 9,
    title: 'CAN',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_HAK_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_HAK_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_HAK',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_HAK',
    rowId: 9,
    sortIndex: 11,
    title: 'HAK',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_CTU_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_CTU_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_CTU',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_CTU',
    rowId: 10,
    sortIndex: 12,
    title: 'CTU',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_SYX_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_SYX_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_SYX',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_SYX',
    rowId: 11,
    sortIndex: 14,
    title: 'SYX',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_NGB_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_NGB_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_NGB',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_NGB',
    rowId: 12,
    sortIndex: 16,
    title: 'NGB',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_AQG_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_AQG_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_AQG',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_AQG',
    rowId: 13,
    sortIndex: 17,
    title: 'AQG',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_CWJ_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_CWJ_票价',
        title: '票价',
      },
    ],
    dataIndex: '起飞机场_CWJ',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_CWJ',
    rowId: 14,
    sortIndex: 19,
    title: 'CWJ',
  },
]
console.log(cols)
const cols1 = [
  {
    children: [
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号1',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号2',
      },
    ],
    fieldInfo: {
      aggType: '',
      dateType: '',
      field: 't_2.dep_airport',
      fieldDataType: 'STRING',
      fieldDisplayAlias: '起飞机场',
      fieldType: 'SINGLE',
      sortType: 'DESC',
    },
    rowId: 1,
    title: '起飞机场',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_URC_票价',
        fieldInfo: {
          aggType: 'SUM',
          dateType: '',
          field: 't_2.ticket_price',
          fieldDataType: 'NUMBER',
          fieldDisplayAlias: '票价',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '起飞机场_URC_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_URC',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_URC',
    rowId: 2,
    sortIndex: 1,
    title: 'URC',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_LHW_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_LHW_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_LHW',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_LHW',
    rowId: 3,
    sortIndex: 2,
    title: 'LHW',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_HET_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_HET_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_HET',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_HET',
    rowId: 4,
    sortIndex: 3,
    title: 'HET',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_KMG_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_KMG_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_KMG',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_KMG',
    rowId: 5,
    sortIndex: 4,
    title: 'KMG',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_JHG_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_JHG_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_JHG',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_JHG',
    rowId: 6,
    sortIndex: 6,
    title: 'JHG',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_SZX_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_SZX_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_SZX',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_SZX',
    rowId: 7,
    sortIndex: 7,
    title: 'SZX',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_CAN_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_CAN_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_CAN',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_CAN',
    rowId: 8,
    sortIndex: 9,
    title: 'CAN',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_HAK_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_HAK_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_HAK',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_HAK',
    rowId: 9,
    sortIndex: 11,
    title: 'HAK',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_CTU_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_CTU_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_CTU',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_CTU',
    rowId: 10,
    sortIndex: 12,
    title: 'CTU',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_SYX_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_SYX_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_SYX',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_SYX',
    rowId: 11,
    sortIndex: 14,
    title: 'SYX',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_NGB_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_NGB_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_NGB',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_NGB',
    rowId: 12,
    sortIndex: 16,
    title: 'NGB',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_AQG_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_AQG_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_AQG',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_AQG',
    rowId: 13,
    sortIndex: 17,
    title: 'AQG',
  },
  {
    align: 'CENTER',
    children: [
      {
        align: 'CENTER',
        dataIndex: '起飞机场_CWJ_票价',
        fieldInfo: {
          $ref: '$.headers[1].children[0].fieldInfo',
        },
        key: '起飞机场_CWJ_票价',
        title: '票价',
      },
      {
        align: 'CENTER',
        dataIndex: '航班号',
        fieldInfo: {
          aggType: '',
          dateType: '',
          field: 't_2.flight_no',
          fieldDataType: 'STRING',
          fieldDisplayAlias: '航班号',
          fieldType: 'SINGLE',
          sortType: 'DESC',
        },
        key: '航班号',
        title: '航班号',
      },
    ],
    dataIndex: '起飞机场_CWJ',
    fieldInfo: {
      $ref: '$.headers[0].fieldInfo',
    },
    key: '起飞机场_CWJ',
    rowId: 14,
    sortIndex: 19,
    title: 'CWJ',
  },
]
console.log(cols1)

const dataSource = [
  {
    起飞机场_LHW_票价: '27300.0',
    航班号: '9992',
    起飞机场_URC_票价: '0.0',
    order_index: 1,
  },
  {
    航班号: '9986',
    起飞机场_HET_票价: '0.0',
    order_index: 3,
  },
  {
    航班号: '9985',
    起飞机场_KMG_票价: '85920.0',
    order_index: 4,
  },
  {
    航班号: '9983',
    起飞机场_KMG_票价: '0.0',
    order_index: 5,
  },
  {
    航班号: '9981',
    order_index: 6,
    起飞机场_JHG_票价: '-48.0',
  },
  {
    航班号: '9980',
    order_index: 7,
    起飞机场_SZX_票价: '0.0',
  },
  {
    航班号: '9979',
    起飞机场_KMG_票价: '14400.0',
    order_index: 8,
  },
  {
    航班号: '9976',
    order_index: 9,
    起飞机场_CAN_票价: '0.0',
  },
  {
    航班号: '9975',
    起飞机场_KMG_票价: '1830.0',
    order_index: 10,
  },
  {
    航班号: '9972',
    起飞机场_HAK_票价: '0.0',
    order_index: 11,
  },
  {
    航班号: '9970',
    order_index: 12,
    起飞机场_CTU_票价: '0.0',
  },
  {
    航班号: '9969',
    起飞机场_KMG_票价: '0.0',
    order_index: 13,
  },
  {
    起飞机场_SYX_票价: '0.0',
    航班号: '9966',
    order_index: 14,
  },
  {
    航班号: '9961',
    起飞机场_KMG_票价: '0.0',
    order_index: 15,
  },
  {
    起飞机场_NGB_票价: '0.0',
    起飞机场_AQG_票价: '0.0',
    航班号: '9960',
    order_index: 16,
  },
  {
    航班号: '9959',
    起飞机场_KMG_票价: '2640.0',
    order_index: 18,
  },
  {
    航班号: '9958',
    order_index: 19,
    起飞机场_CWJ_票价: '19848.0',
  },
  {
    航班号: '9957',
    起飞机场_KMG_票价: '960.0',
    order_index: 20,
  },
]
import BC from '../utils/broadcast'
export default {
  data() {
    return {
      a: 1,
      list: [],
      arrs: [
        { name: 'cy1', age: 12 },
        { name: 'cy2', age: 12 },
        { name: 'cy3', age: 12 },
      ],
      message: 'hello world',
      cols: [],
      dataSource: [],
    }
  },
  created() {
    Array.from({ length: 5000 }).map((_, index) => {
      this.list.push({
        id: index,
        title: '标题' + index,
      })
    })
    console.log(this.list)
  },
  mounted() {
    this.cols = cols
    this.dataSource = dataSource
    BC.onmessage = ({ data }) => {
      const { target, dataSource } = data
      console.log(target, dataSource)
      this.message = 'asdfasdf' + Math.random()
    }
  },
  components: {
    RenderCom,
    VTable,
    // SlotTest,
  },
  methods: {
    broadcast() {
      BC.postMessage({ target: 'a', dataSource: this.list })
    },
    changeArr() {
      this.arrs[1].name = 'hahah'
    },

    chaneg() {
      this.a++
      this.a++
      this.a++
      this.a++

      new Promise((resolve) => {
        resolve()
      }).then(() => {
        this.a++
      })
    },
  },
}
</script>
<style lang="less" scoped></style>
