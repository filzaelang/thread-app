import { Grid, GridItem } from "@chakra-ui/react";
import { useState, useEffect } from 'react';

// components
import Navbar from "../components/Navbar";
import Rightbar from "../components/Rightbar";

function RootLayout({ children }: { children: React.ReactNode }) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const isMobile = windowWidth < 991;

    return (
        <Grid templateColumns="repeat(12, 1fr)" bg="#1d1d1d">

            {/* KODINGAN JIKA LAYAR DIBAWAH 991PX*/}
            {isMobile && (
                <>
                    {/* main content */}
                    <GridItem
                        as="main"
                        bg="#1d1d1d"
                        paddingTop={"40px"}
                        paddingBottom={"60px"}
                        colSpan={{ base: 12, lg: 7, xl: 7 }}
                        display={{ base: "block", lg: "block", xl: "block" }}
                        height={"100vh"} overflow={"auto"}
                        sx={{
                            "&::-webkit-scrollbar": {
                                width: "0.5em",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#1d1d1d",
                            },
                        }}
                    >
                        {children}
                    </GridItem>

                    {/* sidebar */}
                    <GridItem
                        as="aside"
                        colSpan={{ base: 12, lg: 2, xl: 2 }}
                        bg="#1d1d1d"
                        paddingTop={"15px"}
                        paddingBottom={"15px"}
                        minHeight={{ lg: '100vh' }}
                        borderRight={{ lg: "2px solid white" }}
                        display={{ base: "block", lg: "block", xl: "block" }}
                        position="fixed"
                        bottom="0"
                        left="0"
                        width="100%"
                    >
                        <Navbar />
                    </GridItem>
                </>
            )}
            {/* KODINGAN JIKA LAYAR DIBAWAH 991PX*/}

            {/* KODINGAN JIKA LAYAR DIATAS 991PX*/}
            {!isMobile && (
                <>
                    {/* sidebar */}
                    <GridItem
                        as="aside"
                        colSpan={{ base: 12, lg: 2, xl: 2 }}
                        bg={"#262626"}
                        paddingTop={"30px"}
                        minHeight={{ lg: '100vh' }}
                        display={{ base: "block", lg: "block", xl: "block" }}
                    >
                        <Navbar />
                    </GridItem>

                    {/* main content */}
                    <GridItem
                        as="main"
                        bg="#1d1d1d"
                        paddingTop={"40px"}
                        colSpan={{ base: 12, lg: 7, xl: 7 }}
                        display={{ base: "block", lg: "block", xl: "block" }}
                        height={"100vh"} overflow={"auto"}
                        sx={{
                            "&::-webkit-scrollbar": {
                                width: "0.5em",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#1d1d1d",
                            },
                        }}
                    >
                        {children}
                    </GridItem>
                </>
            )}
            {/* KODINGAN JIKA LAYAR DIATAS 991PX */}

            {/* Right bar */}
            <GridItem
                as={"aside"}
                colSpan={{ base: 12, lg: 3, xl: 3 }}
                bg="#1d1d1d"
                paddingTop={"40px"}
                zIndex={3}
                display={{ base: "none", lg: "block", xl: "block" }} // Menampilkan right bar hanya di lg dan xl
            >
                <Rightbar />
            </GridItem>
        </Grid>
    );
}

export default RootLayout;
