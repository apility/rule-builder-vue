export default [
    {
        type: 'dateRange',
        label: 'Date Range',
        hasChildren: false,
        template: {
            from: null,
            to: null
        }
    },
    {
        type: 'recurringDateRange',
        label: 'Recurring date range',
        hasChildren: false,
        template: {
            interval: 'yearly',
            from: '0001-01-01',
            to: null
        }
    },
    {
        type: 'dayOfWeek',
        label: 'Day of week',
        hasChildren: false,
        template: {
            days: []
        }
    },
    {
        type: 'not',
        label: 'Not',
        hasChildren: false,
        template: {
            child: null
        }
    },
    {
        type: 'group',
        label: 'Group',
        hasChildren: true,
        template: {
            count: 'all',
            children: []
        }
    }
]