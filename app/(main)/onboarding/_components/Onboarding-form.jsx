"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import useFetch from "@/hooks/use-fetch";
import { onboardingSchema } from "@/app/lib/schema";
import { updateUser } from "@/actions/user";


const OnboardingForm = ({ industries }) => {

    const [selectIndustry, setSelectedIndustry] = useState(null)
    const router = useRouter()

    const {
        loading: updateLoading,
        fn: updateUserFn,
        data: updateResult
    } = useFetch(updateUser)

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch
    } = useForm({
        resolver: zodResolver(onboardingSchema)
    })

    const onSubmit = async (values) => {
        try {
            const formattedIndustry = `${values.industry}-${values.subIndustry
                .toLowerCase()
                .replace(/ /g, "-")}`

            await updateUserFn({
                ...values,
                industry: formattedIndustry,
            })
        } catch (error) {
            console.log("Onboarding error", error)
        }
    }

    useEffect(() => {
        if (updateResult?.success && !updateLoading) {
            toast.success("Profile completed Successfully")
            router.push("/dashboard")
            router.refresh()
        }
    }, [updateResult, updateLoading])

    const watchIndustry = watch("industry")

    return (
        <div className="flex items-center justify-center bg-background ">
            <Card className="w-full max-w-lg mt-10 mx-2">
                <CardHeader >
                    <CardTitle className="gradient-title text-4xl">Welcome to Onboarding</CardTitle>
                    <CardDescription className="text-sm">Please fill out the form below to get started.</CardDescription>
                </CardHeader>
                <CardContent >
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="space-y-2  ">
                            <Label htmlFor="industry">Industry</Label>
                            <Select

                                onValueChange={(value) => {
                                    setValue("industry", value)
                                    setSelectedIndustry(
                                        industries.find(
                                            (indus) => indus.id === value)
                                    );
                                    setValue("subIndustry", "")
                                }}>
                                <SelectTrigger id="industry">
                                    <SelectValue placeholder="Select an Industry" />
                                </SelectTrigger>
                                <SelectContent>
                                    {industries.map((indus) => {
                                        return <SelectItem value={indus.id} key={indus.id}>{indus.name}</SelectItem>
                                    })}
                                </SelectContent>
                            </Select>

                            {errors.industry && (
                                <p className="text-sm text-red-500">{errors.industry.message}</p>
                            )}
                        </div>

                        {watchIndustry && (
                            <div className="space-y-2">
                                <Label htmlFor="subIndustry">Specialization</Label>
                                <Select

                                    onValueChange={(value) => {
                                        setValue("subIndustry", value)
                                    }}>
                                    <SelectTrigger id="subIndustry">
                                        <SelectValue placeholder="Select an Industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {selectIndustry?.subIndustries.map((indus) => {
                                            return <SelectItem value={indus} key={indus}>{indus}</SelectItem>
                                        })}
                                    </SelectContent>
                                </Select>

                                {errors.subIndustry && (
                                    <p className="text-sm text-red-500">{errors.subIndustry.message}</p>
                                )}
                            </div>)}


                        <div className="space-y-2">
                            <Label htmlFor="experience">Experience Level</Label>
                            <Input
                                id="experience"
                                type="number"
                                min="0"
                                max="50"
                                placeholder="Enter the year of Experience"
                                {...register("experience")}
                            >
                            </Input>

                            {errors.experience && (
                                <p className="text-sm text-red-500">{errors.experience.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="skills">Skills</Label>
                            <Input
                                id="skills"

                                placeholder="e.g., avaScript, Python, Product Management"
                                {...register("skills")}
                            >
                            </Input>
                            <p className="test-sm text-muted-foreground">
                                Separate multiple skills with commas
                            </p>
                            {errors.skills && (
                                <p className="text-sm text-red-500">{errors.skills.message}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="bio">Professional Bio</Label>
                            <Textarea
                                id="bio"
                                placeholder="Tell us about your professional background..."
                                className="h-32"
                                {...register("bio")}
                            >
                            </Textarea>
                            {errors.bio && (
                                <p className="text-sm text-red-500">{errors.bio.message}</p>
                            )}
                        </div>

                        <Button className="w-full" type="submit" disabled={updateLoading}>
                            {updateLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                "Complete Profile"
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div >
    )
}

export default OnboardingForm