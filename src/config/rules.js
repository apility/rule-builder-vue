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
        type: 'recurring',
        label: 'Recurring',
        hasChildren: false,
        template: {
            interval: 'yearly',
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