import { useEffect, useRef, useState } from 'react'

import { useNavigate, useParams } from "react-router-dom"
import { Document, Page } from "react-pdf/dist/esm/entry.vite"

import { Spinner, IconButton, Box, Label, Tooltip, Text } from '@primer/react'
import { PageHeader } from '@primer/react/drafts'

import * as Styles from './styles'
import { PinIcon, ShareIcon, XIcon, ZoomInIcon, ZoomOutIcon, ChevronLeftIcon, ChevronRightIcon, IssueReopenedIcon, SidebarCollapseIcon } from "@primer/octicons-react"
import { useAirportStore } from "../../stores/airportStore"
import { PDFPageProxy } from 'react-pdf'
import { useAirportLayoutStore } from '../../stores/airportLayoutStore'
import { useIsMobile } from '../../hooks/isMobile'

const ZOOM_SCALE_MAP = [
  1,
  1.5,
  2,
  2.5,
  3,
];

const ROTATE_MAP = [
  0,
  270,
  180,
  90
];

export const AirportChartPage = () => {
  const { chartId, icao } = useParams()
  const airportStore = useAirportStore()
  const airportLayoutStore = useAirportLayoutStore()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [numberOfPages, setNumberOfPages] = useState(1)
  const [pageNumber, setPageNumber] = useState(1)
  const [zoomScale, setZoomScale] = useState(0)
  const [rotate, setRotate] = useState(0)
  const chartElement = useRef<HTMLDivElement | null>()
  const chartContainerElement = useRef<HTMLDivElement | null>()
  const [chartHeight, setChartHeight] = useState(0)
  const { isMobile } = useIsMobile()

  const [enabledScroll, setEnabledScroll] = useState(false)

  const [page, setPage] = useState<PDFPageProxy>()
  const chart = airportStore.airport?.charts.find(chart => chart.id === chartId)

  const handlePageUpdate = () => {
    if (!chartElement.current || !page) return;

    const pageWidth = page.getViewport({ scale: ZOOM_SCALE_MAP[zoomScale] }).width;
    const pageHeight = page.getViewport({ scale: ZOOM_SCALE_MAP[zoomScale] }).height;

    const containerWidth = chartContainerElement.current?.getBoundingClientRect().width || 0;

    const chartWidth = chartElement.current?.querySelector("div")!.getBoundingClientRect().width || 0;

    const pageOrientation = pageWidth < pageHeight && [0, 180].includes(ROTATE_MAP[rotate]) ? 'portrait' : 'landscape';

    if ((pageOrientation === 'landscape' && zoomScale) || chartWidth > containerWidth) {
      setEnabledScroll(true);
    } else {
      setEnabledScroll(false);
    }

    setChartHeight(chartContainerElement.current?.clientHeight! * ZOOM_SCALE_MAP[zoomScale]);
  };

  useEffect(() => {
    setIsLoading(true);

    if (isMobile) {
      airportLayoutStore.changeSidebar(false)
    }

    return () => {
      setIsLoading(true);
      setPageNumber(1);
      setNumberOfPages(1);
      setZoomScale(0);
      setRotate(0);
    }
  }, [chartId]);

  useEffect(() => {
    handlePageUpdate();
  }, [page, rotate, zoomScale]);

  useEffect(() => {
    const handleWindowResize = () => {
      handlePageUpdate();
    };

    window.document.addEventListener('resize', handleWindowResize);

    if (isMobile) {
      airportLayoutStore.changeSidebar(false)
    }

    return () => {
      window.document.removeEventListener('resize', handleWindowResize);
    }
  }, []);

  useEffect(() => {
    handlePageUpdate();
  }, [airportLayoutStore.isOpenSidebar])

  return (
    <Styles.Container>
      <Styles.Header>
        <PageHeader>
          <PageHeader.TitleArea sx={{alignItems: 'center'}}>
            {
              !airportLayoutStore.isOpenSidebar && (
                <PageHeader.LeadingAction>
                  <IconButton
                    aria-label="Expand"
                    icon={SidebarCollapseIcon}
                    variant="invisible"
                    onClick={() => airportLayoutStore.changeSidebar(true)}
                  />
                </PageHeader.LeadingAction>
              )
            }
            <PageHeader.Title sx={{fontSize: 2, alignItems: 'center'}}>
              <span>{ chart?.name }</span>
              <Label sx={{ml: 2}}>{chart?.type}</Label>
            </PageHeader.Title>
            <PageHeader.Actions>
              {
                !isLoading && (
                  <>
                    { numberOfPages > 1 && (
                      <>
                        <Tooltip aria-label="Prev Page" direction="s">
                          <IconButton
                            aria-label="Prev Page"
                            icon={ChevronLeftIcon}
                            onClick={() => setPageNumber(pageNumber - 1)}
                            disabled={pageNumber === 1}
                          />
                        </Tooltip>
                        <Text>{pageNumber} / {numberOfPages}</Text>
                        <Tooltip aria-label="Next Page" direction="s">
                          <IconButton
                            aria-label="Next Page"
                            icon={ChevronRightIcon}
                            onClick={() => setPageNumber(pageNumber + 1)}
                            disabled={pageNumber === numberOfPages}
                          />
                        </Tooltip>

                        <Box sx={{width: 1, bg: 'border.muted', height: '100%'}} />
                      </>
                    ) }

                    <Tooltip aria-label="Zoom Out" direction="s">
                      <IconButton
                        aria-label="Zoom Out"
                        icon={ZoomOutIcon}
                        onClick={() => setZoomScale(zoomScale - 1)}
                        disabled={zoomScale === 0}
                      />
                    </Tooltip>
                    <Tooltip aria-label="Zoom In" direction="s">
                      <IconButton
                        aria-label="Zoom In"
                        icon={ZoomInIcon}
                        onClick={() => setZoomScale(zoomScale + 1)}
                        disabled={zoomScale === ZOOM_SCALE_MAP.length - 1}
                      />
                    </Tooltip>
                    <Tooltip aria-label="Rotate" direction="s">
                      <IconButton
                        aria-label="Rotate"
                        icon={IssueReopenedIcon}
                        onClick={() => setRotate(rotate === ROTATE_MAP.length - 1 ? 0 : rotate + 1)}
                      />
                    </Tooltip>

                    <Box sx={{width: 1, bg: 'border.muted', height: '100%'}} />
                  </>
                )
              }
              <Tooltip aria-label="Pin Chart" direction="s">
                <IconButton aria-label="Pin Chart" icon={PinIcon} disabled/>
              </Tooltip>
              <Tooltip aria-label="Share Chart" direction="s">
                <IconButton aria-label="Share Chart" icon={ShareIcon} disabled/>
              </Tooltip>
              <Tooltip aria-label="Close Chart" direction="sw">
                <IconButton
                  aria-label="Close Chart"
                  icon={XIcon}
                  variant="danger"
                  onClick={() => {
                    navigate(`/app/airport/${icao}`)
                    airportLayoutStore.changeSidebar(true)
                  }}
                />
              </Tooltip>
            </PageHeader.Actions>
          </PageHeader.TitleArea>
        </PageHeader>
      </Styles.Header>
      <Styles.ChartContainer ref={e => chartContainerElement.current = e}>
        <Styles.Chart
          ref={e => chartElement.current = e}
          vCenter={isLoading}
          hCenter={!enabledScroll}
        >
          <Document
            file={`https://api.opennavcharts.com.br/api/charts/id?id=${chartId}`}
            loading={<Spinner />}
            onLoadSuccess={doc => {
              setNumberOfPages(doc.numPages);
              setIsLoading(false);
            }}
          >
            <Page
              pageNumber={pageNumber}
              height={chartHeight}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              rotate={ROTATE_MAP.at(rotate)}
              onLoadSuccess={page => setPage(page)}
            />
          </Document>
        </Styles.Chart>
      </Styles.ChartContainer>
    </Styles.Container>
  )
}