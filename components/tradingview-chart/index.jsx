import React, { useEffect, useRef, useState } from 'react';
import { widget } from '@/assets/charting_library/charting_library.esm';
import DataFeed from './datafeed';

export const TVChartContainer = () => {
    const [isLoading, setIsLoading] = useState(true)
    const chartContainerRef = useRef();

    const datafeed = DataFeed();


    const defaultProps = {
        symbol: 'Bitfinex:BTC/USD',
        interval: '1D',
        libraryPath: '/static/charting_library/',
        timezone: 'Asia/Shanghai',
        fullscreen: false,
        autosize: true,
        container: 'TVChartContainer'
    };

    useEffect(() => {
        const widgetOptions = {
            // debug: true
            // user_id: 'public_user_id',
            // client_id: 'ordipulse.com',
            symbol: defaultProps.symbol,
            datafeed: datafeed,
            interval: defaultProps.interval,
            container: defaultProps.container,
            library_path: defaultProps.libraryPath,
            timezone: defaultProps.timezone,
            locale: 'en',
            disabled_features: ['header_compare', 'header_symbol_search', 'save_chart_properties_to_local_storage'],
            enabled_features: ['items_favoriting'],
            fullscreen: defaultProps.fullscreen,
            autosize: defaultProps.autosize,
            theme: "Dark",
            favorites: {
                intervals: ["15", "60", "240", "720", "1D", "1W"],
            },
            time_frames: [
                { text: "1d", resolution: "15", description: "24 Hours", title: "24H" },
                { text: "7d", resolution: "1D", description: "7 Days", title: "7D" },
                { text: "30d", resolution: "1D", description: "30 Days", title: "30D" },
                { text: "10000m", resolution: "1D", description: "Total", title: "Total" },
            ],
            timeframe: '30d',
        };

        const tvWidget = new widget(widgetOptions);

        tvWidget.onChartReady(() => {
            setIsLoading(false);
            tvWidget.activeChart().getSeries().setChartStyleProperties(1, {
                barColorsOnPrevClose: true
            })
            tvWidget.activeChart().onIntervalChanged().subscribe(null, (interval, timeframeObj) =>
                localStorage.setItem('kline_interval', JSON.stringify(interval))
            );
        });

        return () => {
            tvWidget.remove();
        };
    }, []);

    return (
        <div
            ref={chartContainerRef}
            id='TVChartContainer'
            style={{ height: '700px' }}
        />
    );
}
