"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { useReadContract, useWriteContract } from "wagmi";
import { useState } from "react";

const abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gumballinit",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_gumballadd",
        type: "uint256",
      },
    ],
    name: "addFreshGumballs",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getGumball",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfGumballs",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const formSchema = z.object({
  gumballaddition: z.coerce.number().gte(0, "Must be a positive number"),
});

export function GumballForm() {
  const [addedGumballs, setAddedGumballs] = useState(0);

  const { writeContract } = useWriteContract();
  function addingFreshGumballs(gumball: number) {
    writeContract({
      address: "0x6df511640a9ed4615A4679246E561f711FABDD61",
      abi,
      functionName: "addFreshGumballs",
      args: [BigInt(gumball)],
    });
  }
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      gumballaddition: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    setAddedGumballs(values.gumballaddition);
    console.log(values.gumballaddition);
    addingFreshGumballs(values.gumballaddition);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="gumballaddition"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Add Gumballs</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
              <FormDescription>Add some gumballs!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
